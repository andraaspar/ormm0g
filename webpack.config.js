const path = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const extractLess = new ExtractTextPlugin({
	filename: 'style/[name].[contenthash].css',
})

module.exports = {
	entry: {
		main: './src/ts/src/main.ts',
	},
	output: {
		path: path.resolve('./build'),
		filename: 'script/[name].[hash].js',
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'awesome-typescript-loader',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$|glyphicons-halflings-regular.svg$/,
				loader: 'file-loader',
				options: {
					name: 'style/fonts/[name].[hash].[ext]',
				},
			},
			{
				test: /\.less$/i,
				use: extractLess.extract(['css-loader', 'less-loader']),
			},
			{
				test: /\.hbs$/i,
				use: ['handlebars-loader'],
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(['build']),
		new CheckerPlugin(),
		new HtmlWebpackPlugin({
			template: './src/hbs/index.hbs',
		}),
		extractLess,
	],
}