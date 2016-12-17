/**
 * Created by jmoor6 on 12/13/16.
 */

module.exports = {
    devtool: "source-map",
    entry: './src/client/index.js',
    output: {
        path: './bin',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
};