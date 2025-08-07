const path = require('path');

module.exports = {
	entry: './src/steam.ts',
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.less?$/,
				use: ['style-loader', 'css-loader', 'less-loader'],
			},
			{
				test: /\.svg$/,
				type: 'asset/resource',
				generator: {
					filename: 'assets/[name][ext]',
				}
			}
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.svg'],
	},
	output: {
		filename: 'steam.js',
		path: path.resolve(__dirname, 'dist'),
	},
};
