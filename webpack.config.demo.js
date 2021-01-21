// dice.io demo application webpack configuration

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');

var options = {
  entry: path.resolve(__dirname, 'src/demo/index.js'),
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'app.min.js',
    library: 'DemoApp',
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        include: [
          path.resolve(__dirname, 'src')
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?url=false',
          'postcss-loader',
        ],
      },
    ],
  },
  optimization: {},
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/app.min.css',
    }),
  ]
}

if (process.env.npm_lifecycle_event === 'dist') {
  options.optimization.minimizer = [
    new TerserPlugin({
      extractComments: false,
      terserOptions: {
        output: {
          comments: false,
        },
      },
    }),
    new OptimizeCSSAssetsPlugin({}),
  ]
} else {
  options.optimization.minimize = false
}

module.exports = options
