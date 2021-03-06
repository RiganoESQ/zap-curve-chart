const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: 'production',
  entry: {
    'zap-curve-chart': [path.resolve(__dirname, './src/index.ts')],
  },
  output: {
    filename: "[name].js",
    library: 'ZapCurveChart',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    'chart.js': {
      commonjs: 'Chart',
      commonjs2: 'Chart',
      amd: 'Chart',
      root: 'Chart'
    },
    'bignumber.js': {
      commonjs: 'BigNumber',
      commonjs2: 'BigNumber',
      amd: 'BigNumber',
      root: 'BigNumber'
    },
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new MiniCssExtractPlugin({filename: 'style.css'})
  ]
});
