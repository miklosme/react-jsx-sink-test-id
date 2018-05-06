const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on) => {
    const options = webpack.defaultOptions
    options.webpackOptions.module.rules[0].use[0].options.plugins = [['../../src/index.js', { __sinker: '../../src/sinker/index.js' }]]

    on('file:preprocessor', webpack(options))
}