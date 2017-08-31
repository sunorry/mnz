// for prd loading
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

function resolve(_path) {
    return path.resolve(_path)
}

module.exports = {
    entry: ['./src/main.js', './src/css/base.scss'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]@[chunkhash].js',
        publicPath: './'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [path.resolve('src')]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader'
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }]
    },
    // devtool:  '#cheap-module-eval-source-map',
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify('production')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // new webpack.NoEmitOnErrorsPlugin(),
        new CleanWebpackPlugin(['dist']),
        new UglifyJSPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }),
        new ExtractTextPlugin('style@[chunkhash].css'),
        new HtmlWebpackPlugin({
            title: 'tpl',
            template: 'index.html',
            // inject: true
        }),
    ]
}