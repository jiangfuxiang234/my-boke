// 使用component: () => import(/* webpackChunkName: "home" */ "@/views/Home")模式来导入组件可以实现打包时页面分包(import函数返回的是promise)
import "nprogress/nprogress.css"
import { start, done, configure } from "nprogress"; // 显示进度条，在组件加载出来之前显示进度条
import NotFound from "@/views/NotFound.vue"
configure({ // 进度条配置
    trickleSpeed: 20, // 进度条加载速度
  showSpinner: false, // 不显示在转的小圆圈
})
function delay(duration){
   return new Promise((resolve)=>{
        setTimeout(()=>{resolve()}, duration);
    })
}
function getPageComponent(pageCompResolver){
return async() =>{
start();
if(process.env.NODE_ENV === "development"){ // 因为process.env.NODE_ENV只能在node环境里面获取，
    delay(2000)                             // 但是经过vue处理后也能在浏览器里获取，
}                                           // 而不是浏览器本身就能获取
const comp = await pageCompResolver();
done();
return comp;
}
}
const routes = [ // 路由配置规则
    { name: "Home", path: "/", component: getPageComponent(() => import(/* webpackChunkName: "home" */ "@/views/Home")), meta:{title: "首页"} }, // 命名路由，给路由配置name，当使用name时，路径会自动链接上path值
    { name: "About", path: "/About", component: getPageComponent(() => import(/* webpackChunkName: "about" */ "@/views/About")), meta:{title: "关于我"}  },
    { name: "Blog", path: "/Blog", component: getPageComponent(() => import(/* webpackChunkName: "blog" */ "@/views/Blog")), meta:{title: "文章"}  },
    { name: "Message", path: "/Message", component: getPageComponent(() => import(/* webpackChunkName: "message" */ "@/views/Message")), meta:{title: "留言板"}  },
    { name: "Project", path: "/Project", component: getPageComponent(() => import(/* webpackChunkName: "project" */ "@/views/Project")), meta:{title: "项目&效果"}  },
    { name: "BlogDetail", path: "/article/:id", component: getPageComponent(() => import(/* webpackChunkName: "blogdetail" */ "@/views/Blog/Detail")), meta:{title: "文章详情"}  },
    { name: "CategoryBlog", path: "/article/cate/:categoryId", component: getPageComponent(() => import(/* webpackChunkName: "blog" */ "@/views/Blog")), meta:{title: "文章"}  },
                                                 // categoryId为动态数据
    {name: "NotFound", path: "*", component: NotFound} // path: "*" 为通配符，即没有匹配到的路由都是跳转到这个组件
]
export default routes;