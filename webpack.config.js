const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const prod = process.env.NODE_ENV === 'production';

module.exports = {
	mode: prod ? 'production' : 'development',
	devtool: prod ? 'hidden-source-map' : 'cheap-module-source-map',
	entry: './src/index.tsx',
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ['babel-loader', 'ts-loader'],
			},
		],
	},

	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js',
	},

	plugins: [
		new webpack.ProvidePlugin({
			React: 'react',
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new webpack.HotModuleReplacementPlugin(),
		new CopyWebpackPlugin({
			patterns: [{ from: './public/images', to: './images' }]
		})
	],
	devServer: {
		historyApiFallback: true,
		inline: true,
		port: 3000,
		hot: true,
		publicPath: '/',
	},
};