const
	path = require('path'),
	MiniCssExtract = require('mini-css-extract-plugin'),
	Html = require('html-webpack-plugin');

const isDev = process.env['NODE_ENV'] === 'development';

module.exports = {

	entry: {
		index: {import: './src/client', dependOn: 'framework'},
		framework: [
			'react',
			'react-dom',
			'@bem-react/classname'
		]
	},

	resolve: {
		extensions: ['.js', '.jsx']
	},

	optimization: {
		splitChunks: {
			chunks: 'all'
		},
		runtimeChunk: 'single'
	},

	output: {
		path: path.resolve('dist/client'),
		assetModuleFilename: '[name][ext]',
		clean: true
	},

	devtool: isDev ? 'source-map' : false,

	plugins: [
		new Html({
			template: 'src/client/index.html',
			publicPath: '/app',
			filename: 'index.html'
		}),
		new MiniCssExtract()
	],

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},

			{
				test: /\.(scss|sass)$/,
				use: [{
					loader: MiniCssExtract.loader
				}, {
					loader: 'css-loader'
				}, {
					loader: 'sass-loader'
				}]
			},

			{
				test: /\.(woff|woff2)$/,
				type: 'asset/resource'
			}
		]
	}

};