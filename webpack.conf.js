var path = require('path');

module.exports = {
  entry: './index.ts',
  output: {
    filename: './bundle.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: __dirname
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
    ]
  }
}
