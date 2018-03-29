const path = require('path');
const webpack = require('webpack');

const { UglifyJsPlugin } = webpack.optimize;

const env = process.env.NODE_ENV;
const libraryName = '[name]';

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
    }),
];

let outputFile;
if (env === 'production') {
    plugins.push(new UglifyJsPlugin({
        sourceMap: true,
        compress: {
            warnings: true,
        },
    }));
    plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: true,
    }));
    outputFile = `${libraryName}.min.js`;
} else {
    outputFile = `${libraryName}.js`;
}

module.exports = {

    entry: {
        propserver: [
            path.join(__dirname, '/src/index.js'),
        ],
    },

    devtool: 'source-map',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },

    resolve: {
        modules: [
            path.join(__dirname, './'),
            'node_modules',
        ],

        extensions: ['.js'],
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },

    plugins,
};
