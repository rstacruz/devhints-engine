module.exports = ({ config }) => {
  setupGatsby(config)
  setupTypeScript(config)
  setupStorysource(config)
  setupSass(config)

  return config
}

/**
 * Taken from: https://www.gatsbyjs.org/docs/visual-testing-with-storybook/
 */

function setupGatsby(config) {
  // Include .ts/.tsx here
  config.module.rules[0].test = /\.(mjs|jsx?|tsx?)$/

  // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
  config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]

  // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
  config.module.rules[0].use[0].loader = require.resolve('babel-loader')

  // use @babel/preset-react for JSX and env (instead of staged presets)
  config.module.rules[0].use[0].options.presets = [
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-env')
  ]

  // use @babel/plugin-proposal-class-properties for class arrow functions
  config.module.rules[0].use[0].options.plugins = [
    require.resolve('@babel/plugin-proposal-class-properties')
  ]

  // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
  config.resolve.mainFields = ['browser', 'module', 'main']
}

/**
 * Taken from: https://www.npmjs.com/package/@storybook/addon-storysource
 */

function setupStorysource(config) {
  config.module.rules.push({
    test: /\.stories\.(jsx?|tsx?)$/,
    loaders: [
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: {
          parser: 'typescript'
        }
      }
    ],
    enforce: 'pre'
  })
}

/**
 * Sets up TypeScript compatibility
 */

function setupTypeScript(config) {
  // Include .ts/.tsx here
  config.module.rules[0].test = /\.(mjs|jsx?|tsx?)$/

  // Add .ts/.tsx support
  config.resolve.extensions.push('.ts')
  config.resolve.extensions.push('.tsx')

  // Add TypeScript
  config.module.rules[0].use[0].options.presets.push(
    require.resolve('@babel/preset-typescript')
  )
}

function setupSass(config) {
  // config.module.rules.push({ ... })
}
