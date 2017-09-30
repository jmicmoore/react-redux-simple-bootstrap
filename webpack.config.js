/**
 * Created by jmoor6 on 12/13/16.
 */
const path = require('path');

module.exports = {
    devtool: "source-map",
    entry: './src/client/index.js',
    output: {
        path: path.resolve(__dirname, 'bin'),
        publicPath: "/my-cool-app",
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }
        ]
    }
};