// Webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: ["@babel/polyfill", "./src/index.js"],
    
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'main.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        }, {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        }]
    },
    // optimization: {
    //     minimizer: [new UglifyJsPlugin({
    //         test: /\.js$/,
    //         exclude: /node_modules/,
    //     })],
    // },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            template: './public/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),

    ]
}