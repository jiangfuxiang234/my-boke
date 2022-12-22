import Vue from "vue"
/**
 * 获取某个组件渲染的Dom根元素
 * @param {*} comp 某个组件
 * @param {*} props 组件属性
 * @returns Dom元素
 */
export default function (comp, props) {
    const vm = new Vue({
        render: (h) => h(comp, { props })
    })
    vm.$mount(); // 有生成真实Dom，但没有挂载到某个容器里
    return vm.$el;
}