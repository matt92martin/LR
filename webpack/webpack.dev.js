const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const htmlOptions = require('./options.js').dev;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Merge(CommonConfig, {
    output: {
        filename: '[name].bundle.js',
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3001,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api/**': {
                target: "http://localhost:3000"
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin(htmlOptions),
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('dev')
            }
        })
    ]
});