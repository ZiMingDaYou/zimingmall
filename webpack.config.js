/*
 * @Author: 张培培
 * @Github: https: //github.com/ZiMingDaYou
 * @Date: 2019-01-15 14:16:39
 * @LastEditors: 张培培
 * @LastEditTime: 2019-03-06 23:41:56
 */
const path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
var WEBPACK_ENV = process.env.WEBPACK_ENV||'dev';
//获取html-webpack-plugin参数方法,将对应的js文件注入到html文件中
var getHtmlConfig=function(name) {
    return{
        template: './src/view/'+name+'.html',
        filename: 'view/' + name +'.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
}
//webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'list': ['./src/page/list/index.js'],
        'detail': ['./src/page/detail/index.js'],
        'cart': ['./src/page/cart/index.js'],
        'order-confirm': ['./src/page/order-confirm/index.js'],
        'order-list': ['./src/page/order-list/index.js'],
        'order-detail': ['./src/page/order-detail/index.js'],
        'payment': ['./src/page/payment/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
        'result': ['./src/page/result/index.js'],
        'about': ['./src/page/about/index.js'],
    },
    output: {
        filename: 'js/[name].js',  
        path: path.resolve(__dirname, 'dist'),  //文件生成后存储路径 
        publicPath: '/dist'    //文件访问路径
    },
      mode: 'development' ,
      
      //加载webpack的jquery模块
      externals:{
          'jquery' : 'window.jQuery'
      },
      //独立通用模块打包到base.js
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "common",
                    filename:"js/base.js",
                    chunks: "all",
                    minSize: 2    //optimization.splitChunks.cacheGroups.common 配置项中，是 minSize 设置为 1。没有minChunks属性。

                }
            }
        }
    },
    resolve:{
        alias: {
            node_modules:__dirname+'/node_modules',
            util   : __dirname + '/src/util'   ,
            image  : __dirname + '/src/image'  ,
            page   : __dirname + '/src/page'   ,
            service: __dirname + '/src/service',
            view   : __dirname + '/src/view'
        }
    },
    devServer: {
        port: 8088,
        historyApiFallback: {
            index: '/dist/views/index.html'
        },
        proxy: {
            '/': {
                target: 'http://test.happymmall.com',
                changeOrigin: true
            }
        }
    },
    module: {
        rules: [
            { //v2之后把module里的那个loaders改成rules
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader" // 单独打包出CSS，这里配置注意下
            })
        },
        {
            test:/\.(gif|png|jpg|bmp|woff|svg|ttf|eot)\??.*$/,
            use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100,  // 把小于50000 byte的文件打包成Base64的格式写入JS  
                        name: 'images/[name].[ext]' // 当大于是使用file-loader将图片打包到images目录下
                    }
                }]
            },
            {
                test: /\.(string)$/,
                use: {
                    loader: 'html-loader',
                }
            }
    ]
    },
    plugins: [
        // 单独打包出CSS
        new ExtractTextPlugin('css/[name].css'),
        //html处理模板
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('list')),
        new HtmlWebpackPlugin(getHtmlConfig('detail')),
        new HtmlWebpackPlugin(getHtmlConfig('cart')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm')),
        new HtmlWebpackPlugin(getHtmlConfig('order-list')),
        new HtmlWebpackPlugin(getHtmlConfig('order-detail')),
        new HtmlWebpackPlugin(getHtmlConfig('payment')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update')),
        new HtmlWebpackPlugin(getHtmlConfig('result')),
        new HtmlWebpackPlugin(getHtmlConfig('about')),
    ]
     
};
if('dev'=== WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;