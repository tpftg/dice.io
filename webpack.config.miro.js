// dice.io Miro Web Plugin webpack configuration

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');

var options = {
  entry: {
    main: path.resolve(__dirname, 'src/miro/main.js'),
    plugin: path.resolve(__dirname, 'src/miro/plugin.js'),
  },
  output: {
    path: path.resolve(__dirname, 'public/miro/js'),
    filename: '[name].min.js',
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
      filename: '../css/plugin.min.css',
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
