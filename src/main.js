import "./mock"
import Vue from 'vue'
import App from './App.vue'
import "./styles/global.less"
import router from './router'
import showMessage from "./utils/showMessage";
import "./api/banner"
import "./eventBus"
Vue.prototype.$showMessage = showMessage; // 将showMessage方法挂载到vue实例上，这样任何组件都可以使用，更方便调用该方法
// 全局自定义插件
import vLoading from "./directives/loading";
import vLazy from "./directives/lazy"
Vue.directive("Loading", vLoading)
Vue.directive("Lazy", vLazy)
import store from "./store"
store.dispatch("setting/fetchSetting"); // 一开始就加载一些公共设置
 new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

// 随便测试一下
// import * as blogApi from "./api/blog";

// blogApi.getBlogCategories().then((r) => {
//   console.log("博客分类", r);
// });

// blogApi.getBlogs(2, 10, 3).then((r) => {
//   console.log("博客", r);
// });


// 测试事件总线
// import eventBus from "./eventBus";

// function handler1(data) {
//   console.log("handler1", data);
// }
// function handler2(data) {
//   console.log("handler2", data);
// }
// eventBus.$on("event1", handler1);
// eventBus.$on("event1", handler2);
// eventBus.$on("event2", handler1);

// eventBus.$emit("event1", 222);
// eventBus.$off("event1", handler1);
// console.log("=========")
// eventBus.$emit("event1", 222);
