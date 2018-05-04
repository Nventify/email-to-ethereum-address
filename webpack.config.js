const path = require('path');
const webpack = require('webpack');

const clientConfig = {
    mode: 'production',
    target: 'web',
    performance: {hints: false},
    entry: './lib/EmailToEthereumAddress.js',
    output: {
    path: path.resolve(__dirname, 'dist'),
        filename: 'EmailToEthereumAddress.web.js',
        libraryTarget: 'var',
        library: 'EmailToEthereumAddress'
    },
    plugins: [
        new webpack.ProvidePlugin({
            EmailToEthereumAddress: 'EmailToEthereumAddress'
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            use: {
                loader: "babel-loader",
                options: {
                    cacheDirectory: true
                }
            }
        }]
    }
};

module.exports = [clientConfig];