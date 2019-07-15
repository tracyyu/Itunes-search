const webpack = require('webpack');
const path = require('path');
const combinedLoaders = require('webpack-combine-loaders');
module.exports = {
  entry: __dirname + '/src/index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            "@babel/env",
            "@babel/react"],
          "plugins": [
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-proposal-class-properties"
          ]
        },
      },

      {
        test: /node_modules\/.*\.s?css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        loader: combinedLoaders([
         {
           loader: 'style-loader'
         }, {
           loader: 'css-loader',
           query: {
             modules: true,
             localIdentName: '[name]__[loader]__[hash:base64:5]'
           }
         }, {
           loader : 'sass-loader'
         }
        ])
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|otf)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000' 
      }
    ],
  },
  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js',
  }
};