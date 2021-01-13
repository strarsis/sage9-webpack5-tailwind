'use strict'; // eslint-disable-line

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('./config');

module.exports = {
  module: {
    rules: [
	  {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: config.enabled.sourceMaps } },
          {
            loader: 'postcss-loader', options: {
              postcssOptions: {
                config: path.join( __dirname, 'postcss.config.tailwind.js' ), // PostCSS tailwind specific config
                ctx: config,
              },
              sourceMap: config.enabled.sourceMaps,
            },
          },
          { loader: 'resolve-url-loader', options: { sourceMap: config.enabled.sourceMaps } },
          {
            loader: 'sass-loader', options: {
              sassOptions: {
                sourceComments: true,
              },
              sourceMap: true, //config.enabled.sourceMaps, // false causes a resolve issue
            },
          },
        ],
      },
    ],
  },
};