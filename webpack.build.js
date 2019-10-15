const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (env) => {
	return {
		entry: {
			app: path.join(__dirname, './src/index.jsx'),
		},
		output: {
			filename: 'bundle.js',
			path: path.resolve(__dirname, 'dist')
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: 'index.html',
				filename: 'index.html',
			})
		],
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						'style-loader',
						'css-loader'
					]
				},
				{
					test: /\.(js|jsx)$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						plugins: [
							"transform-class-properties",
							"syntax-dynamic-import"
						],
						presets: [
							"env",
							'react'
						]
					}
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: [
						'file-loader'
					]
				},
			]
		}
	}
}
