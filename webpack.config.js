const path = require('path');
const entryPlus = require('webpack-entry-plus');

module.exports = {
  entry: entryPlus([
    {
      entryFiles: './src/index.harmonic.ts',
      outputName:'harmonic.bundle'
    }, {
      entryFiles: './src/index.poli.harmonic.ts',
      outputName: 'poli.harmonic.bundle'
  }]),
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
    minimize: false,
  }
};
