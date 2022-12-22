module.exports = {
    devServer: {
        Proxy: { // 开启代理
            "/api": {
                target: "http://test.my-site.com",
            }
        }
    },
    configureWebpack: require("./webpack.config") // 分析打包结果
}