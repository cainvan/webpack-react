var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
// var htmlWebpackPlugin =  require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  //多页面入口配置
  entry: {
    a:[
      'webpack/hot/only-dev-server',
      "./app/index1.js"
    ],
    b:[
      'webpack/hot/only-dev-server',
      "./app/index.js"
    ]
  },
  output: {
      path: BUILD_PATH,
      publicPath: "/build/", //webpack-dev-server文件生成存在内存中，就可以实现热加载
      filename: "[name].bundle.js"
  },
  module: {
      loaders: [  //使用loader对一些文件进行相应的处理
          {
            test: /\.js$/, //使用正则匹配要处理的文件
            exclude: /node_modules/,  //排除不处理的目录
            loader: "babel-loader",  //要使用的loader
            query:
              {
                presets:['react','es2015','stage-2'] // 添加这两个presets用来处理js和jsx
              }
          },
          {
            test: /\.jsx$/, //使用正则匹配要处理的文件
            exclude: /node_modules/,  //排除不处理的目录
            loader: "babel-loader",  //要使用的loader
            query:
              {
                presets:['react','es2015','stage-2'] // 添加这两个presets用来处理js和jsx
              }
          },
          // {
          //     test: /\.css$/,
          //     loaders: ['style', 'css-loader'], //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
          // }
          {
                  test: /\.css$/,
                  loader: "style-loader!css-loader?modules"
                },
                           {test: /\.less$/, loader:"style!css!less"},

           {
              test: /\.(png|jpg)$/,
              loader: 'url?limit=40000'  //图片文件使用 url-loader 来处理，小于40000字节的直接转为base64
          }
      ]
  },
  resolve:{
      extensions:['','.js','.json','.jsx']   //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
  },
  devServer: {
      hot: true,  //热加载模式
      inline: true //inline模式(将webpack-dev-sever的客户端入口添加到包(bundle)中,实时刷新)

  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.NoErrorsPlugin(),//用来跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
    new webpack.HotModuleReplacementPlugin()//全局开启代码热替换
  ]
};
