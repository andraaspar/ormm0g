const path = require('path')

const webpack = require('webpack')
const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const extractLess = new ExtractTextPlugin({
	filename: '[name].[contenthash].css',
})

module.exports = {
	entry: {
		main: './src/ts/src/main.tsx',
	},
	output: {
		path: path.resolve('./build'),
		filename: '[name].[chunkhash].js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				options: {
					useBabel: true,
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$|glyphicons-halflings-regular.svg$/,
				loader: 'file-loader',
				options: {
					name: '[name].[hash].[ext]',
				},
			},
			{
				test: /\.less$/i,
				use: extractLess.extract(['css-loader', 'less-loader']),
			},
		]
	},
	plugins: [
		// new BundleAnalyzerPlugin(),
		new CleanWebpackPlugin(['build']),
		new CheckerPlugin(),
		new HtmlWebpackPlugin({
			template: './src/hbs/index.hbs',
		}),
		extractLess,
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: function (module) {
				// this assumes your vendor imports exist in the node_modules directory
				return module.context && module.context.indexOf('node_modules') !== -1
			}
		}),
		// CommonChunksPlugin will now extract all the common modules from vendor and main bundles
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest', // But since there are no more common modules between them we end up with just the runtime code included in the manifest file
		}),
		new webpack.optimize.UglifyJsPlugin(),
	],
}