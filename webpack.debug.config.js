const webpack = require('webpack')

let config = require('./webpack.config.js')

config.plugins = config.plugins.filter(plugin => !(plugin instanceof webpack.optimize.UglifyJsPlugin))

module.exports = config