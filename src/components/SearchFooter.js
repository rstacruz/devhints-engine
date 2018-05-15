/* @flow */
import React from 'react'

import SearchBox from './SearchBox'
import HomeButton from './HomeButton'

/**
 * Search footer in the cheatsheets page.
 */

export const SearchFooter = () => (
  <aside className='search-footer' data-js-no-preview>
    <div className='container'>
      <SearchFooterSection />
    </div>

    <style jsx>{`
      @import 'src/styles/common';
      @import 'src/styles/components/search-footer';
    `}</style>
  </aside>
)

export const SearchFooterSection = () => (
  <section className='search-footer-section'>
    <div className='search'>
      <form className='search' action='/' method='get'>
        <SearchBox />
      </form>
    </div>

    <div className='links'>
      <HomeButton />
    </div>

    <style jsx>{`
      @import 'src/styles/common';
      @import 'src/styles/components/search-footer-container';
    `}</style>
  </section>
)

export default SearchFooter
