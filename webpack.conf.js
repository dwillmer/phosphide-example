
module.exports = {
  entry: './index.js',
  output: {
    filename: './bundle.js'
  },
  resolve: {
    root: __dirname
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  }
}
