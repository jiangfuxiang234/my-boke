const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin // 分析打包结果的插件

if(process.env.NODE_ENV=== "production"){
    module.exports = {  // 进行生产环境打包的配置
        devtool: "none",
        plugins:[new BundleAnalyzerPlugin()],
        externals:{ // 通知webpack进行生产环境打包时不要将这些资源拿去打包，而是引用CDN提供的全局变量
          vue:"Vue",
          vuex:"Vuex",
          "vue-router": "VueRouter",
          axios:"axios"
        }
    }
}else{ // 进行开发环境打包的配置
    module.exports = {}
}