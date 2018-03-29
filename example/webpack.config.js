const path = require('path');

module.exports = {

    entry: path.join(__dirname, 'index.js'),

    output: {
        path: __dirname,
        filename: 'bundle.js',
        publicPath: '/dist/',
    },

    resolve: {
        alias: {
            propserver: path.join(__dirname, '..'),
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },

    devServer: {
        open: true,
    },

    devtool: 'source-map',
};
