const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false, //关闭语法检查
  devServer:{ //开发服务器配置
    port:8006,
    //配置代理
    proxy:{ //定义名为proxy对象，用于配置代理服务器
      '/api':{
        target:'http://localhost:7073',   //设置代理的目标地址
        pathRewrite:{'^/api':''},  //设置路径重写规则   
        ws:true,   // 使代理服务器支持Websocket聊天协议
        changeOrigin:true  //默认跨域 true
      }
    }
  },

})
