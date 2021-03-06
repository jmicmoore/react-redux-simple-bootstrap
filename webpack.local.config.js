const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './src/client/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/my-cool-app",
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env', '@babel/react'],
                    plugins: ['react-hot-loader/babel']
                }
            }
        ]
    }
};
