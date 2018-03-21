const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const toRemove = [
    path.join(__dirname, 'dist')
];

const removeOptions = {
    verbose: true
};


module.exports = {
    entry: {
        polyfill: ['./src/polyfill.js'],
        main: './src/index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/"
    },
    plugins: [
        new CleanWebpackPlugin(toRemove, removeOptions),
        // new webpack.NoEmitOnErrorsPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [ path.join(__dirname, '../src'), 'node_modules' ]
    },
    module: {
        rules: [
            { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
            { test: /\.(png|svg|jpg|gif)$/, use: [ 'file-loader' ] },
            { test: /\.(woff|woff2|eot|ttf|otf)$/, use: [ 'file-loader' ] }
        ]
    }
};