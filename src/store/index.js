import {Store, install} from "vuex"
import Vue from "vue"
import banner from "./banner"
import setting from "./setting"
import about from "./about"
import project from "./project"
if(!window.Vuex){// 当Vuex使用CDN引入时会自动成为Vue的插件且全局上会有Vuex变量，
                 // 所以不需要再use；所以我们需要判断一下看是哪种方式引入 (在生产环境下运行是通过CDN引入)
    install(Vue) // 这相当于Vue.use(Vuex)
}

const store = new Store({
    modules:{
       banner,
       setting,
       about,
       project
    },
    strict:true
})

export default store