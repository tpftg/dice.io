const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');

var options = {
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
    new OptimizeCSSAssetsPlugin({}),
  ]
} else {
  options.optimization.minimize = false
}

var client = Object.assign({}, options, {
  entry: path.resolve(__dirname, 'src/client/index.js'),
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'diceio.min.js',
    library: 'DiceIO',
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
});

var demo = Object.assign({}, options, {
  entry: path.resolve(__dirname, 'src/demo/index.js'),
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'app.min.js',
    library: 'DemoApp',
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
});

demo.plugins.push(new MiniCssExtractPlugin({
  filename: '../css/app.min.css',
}))

demo.module.rules.push({
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    'css-loader?url=false',
    'postcss-loader',
  ],
})

module.exports = [
  client,
  demo,
]
