const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    performance: {hints: false},
    entry: './src/EmailToEthereumAddress.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'EmailToEthereumAddress.js',
        libraryTarget: 'var',
        library: 'EmailToEthereumAddress'
    },
    plugins: [
        new webpack.ProvidePlugin({
            EmailToEthereumAddress: 'EmailToEthereumAddress'
        })
    ]
};