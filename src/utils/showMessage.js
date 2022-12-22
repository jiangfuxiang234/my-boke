import getComponentRootDom from "./getComponentRootDom";
import Icon from "@/components/Icon";
import styles from "./showMessage.module.less";

/**
 * 弹出消息
 * @param {String} content 消息内容
 * @param {String} type 消息类型  info  error  success  warn
 * @param {Number} duration 多久后消失
 * @param {HTMLElement} container 容器，消息会显示到该容器的正中；如果不传，则显示到页面正中
 */
export default function (options = {}) {
    const content = options.content;
    const duration = options.duration || 2000;
    const container = options.container || document.body;
    const type = options.type || "info";
    // 创建消息元素
    const div = document.createElement("div");
    // 得到Icon组件元素
    const iconDom = getComponentRootDom(Icon, {
        type
    });
    div.innerHTML = `<span class="${styles.icon}">${iconDom.outerHTML}</span><div>${content}</div>`;
    // outerHTML表示整个标签，区别于innerHTML
    // 设置样式 
    const typeClass = styles[`message-${type}`]; // 类型样式
    div.className = `${styles.message} ${typeClass}`;

    // 如果容器没有设置position，则设置为relative
    if (options.container) { 
        // 这里判断是为了在没有传container默认为body的情况下，避免将body设为relative，
        // 不然弹出的消息会看不到(不居中) 弹出的消息应该相对整个页面居中
        // 不居中的原因是：body的宽可以确定，没有设置就是视口的，而高是不确定的，所以某个元素
        // 相对于设置了position：relative的body以left50%，top50%来居中是无法中心居中的，只能水平居中，
        // 而最外层的html的宽高就是视口的宽高，这样就可以居中，所以当没传container时，不应该对body设置relative，
        //元素不应该相对于body进行对齐，而应该找到最外层的html进行对齐
        if (getComputedStyle(container).position === "static") {
            container.style.position = "relative";
        }
    }

    // 将div加入到容器中
    container.appendChild(div);

    div.clientHeight; // 获取一下视口高度，目的是让浏览器强制渲染

    div.style.opacity = 1; // opacity改变，触发reflow，随着transition生效

    div.style.transform = "translate(-50%, -50%)";

    // 上移之后消失，接着移除该元素
    setTimeout(() => {
        div.style.opacity = 0;
        div.style.transform = "translate(-50%, -50%) translateY(-25px)"
        div.addEventListener("transitionend", function () {
            div.remove();
            options.callback && options.callback() // 有回调执行回调
        }, {
            once: true // 只执行一次
        })
    }, duration)
}