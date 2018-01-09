var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpack =  require('webpack');



module.exports = {

	entry:[
			'webpack-hot-middleware/client?reload=true',
		    path.join(__dirname, '/client/src/index.js') 
		  ],
	output: {
		path: path.resolve(__dirname, '/dist/'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{ test: /\.(js)$/, include: [ path.join(__dirname, 'client') ], use: 'babel-loader'},
			{
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
        },
			{ test: /\.css$/, include: [ path.join(__dirname, 'client') ], use: ['style-loader', 'css-loader']},
			{
       		    test: /\.(jpg|png|gif|svg)$/,
        		loaders: [
          		 'file-loader',
          		'image-webpack-loader'
        		]
      		},
      	 { test: /\.json$/, include: [ path.join(__dirname, 'client') ], loader: 'json-loader' }
		]	
	},
	plugins: [new HtmlWebpackPlugin({
			template: 'client/public/index.html',
			inject:true
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),

	]
	
}