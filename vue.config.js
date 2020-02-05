//  vue.config.js
//const utils = require("./src/utils/utils");
const path = require('path');
module.exports = {
  //基本路径
   publicPath: process.env.NODE_ENV === 'production'?'':'/',
   //输出文件目录
   outputDir:process.env.NODE_ENV === 'production'?'dist':'devdist',
   //eslint-loader 是否在保存时检查
   lintOnSave: true,


  chainWebpack:(config)=>{
   },
  
   configureWebpack:(config)=>{
    config.resolve ={//配置解析名
       extensions:['.js','.json','.vue'],
       alias:{
       '@':path.resolve(__dirname,'./src'),
       }

     }
   },
   //生产环境是否生成sourcemap文件
   productionSourceMap: false,

  //  //css相关配置
  //  css:{
  //    //是否使用css分离插件ExtractTextPlugin
  //    extract : true,
  //    //开启css sourceMap
  //    sourceMap: false,
  //    //css预设器配置项
  //    loaderOptions:{
  //      sass:{
  //        data:'@import "./src/style/main.scss"'
  //      }
  //    },
  //    //启用css modules for all css/pre-processor files
  //    requireModuleExtension:false
  //  },

   parallel: require('os').cpus().length > 1,

  // //pwa相关配置
  pwa:{},
  
  // //pages: utils.getPages(),
  devServer: {
     port: 8083, // 端口号
     host: "localhost",
     https: false, // https:{type:Boolean}
     open: true, //配置自动启动浏览器
    //  hot: true,//开启热加载
    //  hotonly: false,
    // proxy: null,
    proxy: {
      // 连接后台
      "/api": {
        target: "http://localhost:8082/test", //后台地址
        changeOrigin: true, //跨域代理
        pathRewrite: {
          "^/api": ''//路径重写
        }
      }
    },
    
     overlay:{//全屏模式下是否显示脚本错误
       warning:true,
       errors: true,
     },
     before:app =>{

     }
  }
};
