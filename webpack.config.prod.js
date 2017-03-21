/**
 * Created by Administrator on 2017/3/10.
 */
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包，用于最后的文件打包，开发时使用hotreplace，所以这个不可用
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;//压缩代码

var APP_PATH=path.join(__dirname, 'src');

module.exports = {
    // devtool: 'cheap-module-eval-source-map',
    entry: {
        common: [
            'react',
            'react-dom'
        ],
        index: './src/index'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist/',
        chunkFilename:'[chunkhash:5].min.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production') //定义编译环境
            }
        }),
        new uglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.BannerPlugin('Copyright Max'),//添加bundle.js注释头
        new webpack.optimize.CommonsChunkPlugin({ name: ['common'], filename: '[name].bundle.js' }),//公共模块打包，引用时要先引用此文件
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
            filename: './index.html', //生成的html存放路径，相对于 path
            template: './template/index.html', //html模板路径，相对于本文件目录
            hash: false,
        })
    ],
    module: {
        loaders: [{
            test: /\.js[x]$/,
            loaders: ['babel-loader'],
            include: [APP_PATH]
        }, {
            test: /\.css$/,
            exclude: /^node_modules$/,
            loaders: ExtractTextPlugin.extract({fallback:'style',use: ['css', 'autoprefixer']}),
            include: [APP_PATH]
        }, {
            test: /\.less$/,
            exclude: /^node_modules$/,
            loaders: ExtractTextPlugin.extract({fallback:'style',use: ['css', 'autoprefixer']}),
            include: [APP_PATH]
        }, {
            test: /\.scss$/,
            // loader: 'style-loader!css-loader!sass-loader',
            exclude: /^node_modules$/,
            loaders: ExtractTextPlugin.extract( {fallback:'style-loader',use: ['css-loader', 'sass-loader']}),
            // include: [APP_PATH]
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            loader: 'file-loader?name=[name].[ext]',
            include: [APP_PATH]
        }, {
            test: /\.(png|jpg|gif)$/,
            exclude: /^node_modules$/,
            loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
            //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            include: [APP_PATH]
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.scss', '.css'], //后缀名自动补全
    }
};