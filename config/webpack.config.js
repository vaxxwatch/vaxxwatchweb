const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, '..', 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, '..', 'public'),
    filename: 'index.[hash].js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 80,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template/index.html',
    }),
    new CopyWebpackPlugin([
      { from: './assets/favicon.ico' },
    ]),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/react',
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
};