 const path = require('path');

 module.exports = {
     mode: 'production',
     performance: { hints: false },
     entry: './src/EmailToEthereumAddress.js',
     output: {
    path: path.resolve(__dirname, 'dist'),
         filename: 'EmailToEthereumAddress.js'
     }
 };