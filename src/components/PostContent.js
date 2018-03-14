/* eslint-disable no-new */
import React from 'react'
import decorate from '../lib/rehype-decorate'
import wrapify from '../lib/rehype-wrapify'
import RehypeReact from 'rehype-react'

/**
 * AST renderer
 */

export const renderAst = new RehypeReact({
  createElement: React.createElement
}).Compiler

/**
 * Post content with transform magic.
 */

export default class PostContent extends React.PureComponent {
  render () {
    const { htmlAst, className } = this.props
    let content = renderAst(wrapify(decorate(htmlAst)))

    return (
      <div
        className={className} role='main'
        ref={isotopifyLists}>
        {content}
      </div>
    )
  }
}

/**
 * Lays out each h3-section using Isotope.
 */

function isotopifyLists (el /*: Node */) {
  if (!el || !el.children) return

  // If we're running on the server, don't bother with this
  if (typeof window === 'undefined') return

  // There's a wrapping <div> from renderAst, meh
  const div = el.children[0]

  // isotope()'ify all lists
  const lists = div.querySelectorAll('.h3-section-list')
  Array.from(lists).forEach(isotopify)

  // TODO run iso.layout() on componentWillReceiveProps
}

/**
 * Isotope behavior
 */

function isotopify (el /*: Node */) {
  // Load this async'ly, so that it doesn't happen on the server
  const Isotope = require('isotope-layout/dist/isotope.pkgd.js')

  const iso = new Isotope(el, {
    itemSelector: '.h3-section',
    transitionDuration: 0
  })

  const images /*: NodeList */ = el.querySelectorAll('img')

  Array.from(images).forEach(image => {
    image.addEventListener('load', () => {
      iso.layout()
    })
  })

  // Insurance against weirdness on pages like devhints.io/vim, where the
  // critical path CSS may look different from the final CSS (because of the
  // tables).
  window.addEventListener('load', () => {
    iso.layout()
  })
}