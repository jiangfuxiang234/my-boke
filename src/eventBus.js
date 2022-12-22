// const listeners = {}

// export default {
//     // 监听某一个事件
//     $on(eventName, handle){
//         if(!listeners[eventName]){ // 没有这个事件则给他赋值
//             listeners[eventName] = new Set(); // 赋一个空数组
//         }
//         listeners[eventName].add(handle)
//     },
//     // 取消监听
//     $off(eventName, handle){
//         if(!listeners[eventName]){
//             return
//         }
//         listeners[eventName].delete(handle)
//     },
//     // 触发事件
//     $emit(eventName, ...args){
//         if(!listeners[eventName]){
//             return
//         }
//         for(const handle of listeners[eventName]){
//             handle(...args)
//         }
//     }
// }

// Vue的实例对象里面也有$on,$off,$emit的方法，我们也可以new一个实例对象来使用事件总线
import Vue from "vue";

// 将事件总线挂载到Vue原型上，这样所有的Vue实例都可以使用事件总线
const app = new Vue({})

Vue.prototype.$bus = app;

export default app  // 导出的目的就是让js文件里也可以使用事件总线

