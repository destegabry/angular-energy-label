const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirSrc = path.join(__dirname, 'src');

const pjson = require('./package.json');

/**
 * Webpack Configuration
 */
module.exports = {
  devtool: 'source-map',
  context: dirSrc,
  entry: {
    'energy-label': ['index.js', 'index.scss']
  },
  resolve: {
    modules: [
      dirNode,
      dirSrc
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `[name].${pjson.version}.js`
  },
  plugins: [
    new webpack.DefinePlugin({IS_DEV: IS_DEV}),

    new ExtractTextPlugin({
      filename: `[name].${pjson.version}.css`
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),

    new CleanWebpackPlugin(['dist'])
  ],
  module: {
    rules: [
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
