const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    devtool: 'source-map',
    entry: path.resolve(__dirname, "..", "src", "index.js"),    
    output: {
        path: path.resolve(__dirname, "..", "public"),
        filename: "index.[hash].js"
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ 
            template: './src/index.html' 
        }),
        new CopyWebpackPlugin([
            { from: './assets/favicon.ico' }
        ])
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
}