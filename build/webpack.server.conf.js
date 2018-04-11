const webpack = require('webpack')
const base = require('./webpack.base.conf')
var merge = require('webpack-merge')

const config = merge({}, base, {
  target: 'node',
  devtool: false,
  entry: './src/server-entry.js',
  output: merge({}, base.output, {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  }),
  externals: Object.keys(require('../package.json').dependencies),
  plugins: base.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    })
  ])
})

module.exports = config
