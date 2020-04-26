const path = require('path');

module.exports = {
  entry: {
      'diverse-text': './src/index.ts',
      'diverse-text-web': './src/add-to-window.js',
      'example-google': './examples/google.ts'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    minimize: true
  }
};
