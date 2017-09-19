const path = require('path');
const webpackConfig = require('./webpack.config');

module.exports = Object.assign(webpackConfig, {

  devtool: 'source-map',

  devServer: {
    contentBase: path.join(__dirname, 'src'),
    port: 8000,
    allowedHosts: [
      'localhost',
      '10.0.2.2' // This is for testing on mordern.ie VMs
    ]
  },

  output: {
    pathinfo: true,
    publicPath: '/',
    filename: '[name].js'
  }
});
