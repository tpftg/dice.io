// dice.io client webpack configuration

const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');

var options = {
  entry: path.resolve(__dirname, 'src/client/index.js'),
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'diceio.min.js',
    library: {
      type: 'umd',
      name: 'DiceIO',
      export: 'default',
    },
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
    ],
  },
  optimization: {},
  plugins: []
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
  ]
} else {
  options.optimization.minimize = false
}

module.exports = options
