/**
 * Created by jmoor6 on 12/13/16.
 */
const path = require('path');

module.exports = {
    entry: './src/client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bin')
    }
};