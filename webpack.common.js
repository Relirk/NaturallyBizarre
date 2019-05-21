const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin');

const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');

const title = 'Naturally Bizarre — Relirk';
const description = 'Experiments made by Francisco José Olvera Junior based on the series The Nature of Code by Daniel Shiffman.'

module.exports = {
  entry: {
    vendor: [
      'babel-polyfill'
    ],
    bundle: path.join(dirApp, 'index')
  },

  resolve: {
    modules: [
      dirNode,
      dirApp,
      dirAssets
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: IS_DEV
    }),

    new webpack.ProvidePlugin({

    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'index.ejs'),
      title,
      description,
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          compact: true
        }
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: IS_DEV
            }
          },
        ]
      },

      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: IS_DEV
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: IS_DEV,
              includePaths: [dirAssets]
            }
          }
        ]
      },

      {
        test: /\.ejs$/,
        loader: 'ejs-loader'
      },

      {
        test: /\.(jpe?g|png|gif|svg|woff2?)$/,
        loader: 'file-loader',
        options: {
          name (file) {
            if (IS_DEV) {
              return '[path][name].[ext]'
            }

            return '[hash].[ext]'
          }
        }
      }
    ]
  }
};
