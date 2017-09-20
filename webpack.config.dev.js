const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirSrc = path.join(__dirname, 'src');
const dirDemo = path.join(__dirname, 'demo');

/**
 * Webpack Configuration
 */
module.exports = {
  devtool: 'source-map',

  devServer: {
    contentBase: dirDemo,
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
  },

  entry: {
    bundle: dirDemo
  },

  resolve: {
    modules: [
      dirNode,
      dirDemo,
      dirSrc
    ]
  },
  plugins: [
    new webpack.DefinePlugin({IS_DEV: IS_DEV}),

    new webpack.ProvidePlugin({
      angular: 'angular'
    }),

    new HtmlWebpackPlugin({
      template: path.join(dirDemo, 'index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true
      }
    }),

    new ExtractTextPlugin({
      filename: 'styles/[name].[contenthash].css'
    })
  ],
  module: {
    rules: [
      // Angular
      {
        test: require.resolve('angular'),
        loader: 'exports-loader?window.angular'
      },

      // BABEL
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          compact: true
        }
      },

      // CSS / SASS
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: IS_DEV
              }
            },

            {
              loader: 'postcss-loader',
              options: {
                sourceMap: IS_DEV,
                plugins: [require('autoprefixer')]
              }
            },

            {
              loader: 'sass-loader',
              options: {
                sourceMap: IS_DEV,
                includePaths: [dirSrc]
              }
            }
          ]
        })
      },

      // IMAGES
      {
        test: /\.(jpe*g|png|gif|svg)$/,
        loader: 'file-loader',
        options: {
          context: dirSrc,
          name: '[path][name].[ext]'
        }
      },

      // HTML
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: false,
            collapseWhitespace: false
          }
        }]
      }
    ]
  }
};
