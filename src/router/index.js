import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router';
import { titleController } from '@/utils';
if(!window.VueRouter){  // 当VueRouter使用CDN引入时会自动成为Vue的插件且全局上会有VueRouter变量，
                        // 所以不需要再use；所以我们需要判断一下看是哪种方式引入 (在生产环境下运行是通过CDN引入)
  Vue.use(VueRouter); // 使用VueRouter插件
}
const router = new VueRouter({
  routes,
  mode: "history"
})
router.afterEach((to,from)=>{ // 路由跳转过去之后会执行该函数
  if(to.meta.title){
      titleController.setRouterTitle(to.meta.title)
  }
})
export default router
