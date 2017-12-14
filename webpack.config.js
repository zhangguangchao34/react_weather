var webpack = require('webpack');
var path = require('path');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
	name: "common",
	filename: "js/common.js"
});
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	context: path.resolve(__dirname, "app"),
	entry: {
		index: [
			// 'webpack-dev-server/client?http://localhost:3002',
			'webpack/hot/only-dev-server',
			"./js/index.jsx"
		]
	},
	output: {
		path: __dirname + "/dist",
		filename: "js/[name].js",
		// publicPath: "/weathers/"
	},
	resolve: {
		root: path.resolve(__dirname, "app"),
		extensions: ['', '.js', '.less', '.jsx', '.jpg', '.jpeg', '.gif', '.png']
	},
	module: {
		loaders: [{
				test: /\.js$/,
				exclude: /src\/Pages/,
				loader: 'babel',
				query: {
					compact: false
				}
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
			}, {
				test: /\.js$/,
				include: /src\/Pages/,
				loaders: ['react-router?name=routes/[name]', 'babel'],
			}, {
				test: /\.jsx$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'react-hot!babel-loader?presets[]=react&presets[]=es2015&plugins[]=antd'
			},
			// {
			// 	test: /\.js$/,
			// 	exclude: /(node_modules|bower_components)/,
			// 	loader: 'babel-loader?presets[]=es2015&ignore=./libs/mapbox-gl-0.21.js'
			// },
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract("style-loader", 'css-loader!less-loader?sourceMap')
			}, {
				test: /\.(jpg|png|gif)$/,
				loader: 'url-loader?limit=8192&name=[path][name].[ext]'
			}, {
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
			}, {
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
			}, {
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'
			}, {
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader?name=fonts/[name].[ext]'
			}, {
				test: /\.htc$/, //ie8的部分css3的修复
				loader: 'file-loader?name=pie/[name].[ext]'
			}, {
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]'
			}
		]
	},
	plugins: [
		commonsPlugin,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),

		// 使用 ProvidePlugin 加载使用率高的依赖库
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			L: 'leaflet',
			'window.L': 'leaflet'
		}),

		new ExtractTextPlugin('css/[name].css', {
			allChunks: true
		}),
		new webpack.ContextReplacementPlugin(/buffer/, require('buffer')),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			chunks: ['index', 'common']
		})
	]
};