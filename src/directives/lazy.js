let imgs = [];
import eventBus from "@/eventBus"
import { debounce } from "@/utils"
import defaultImg from "@/assets/default.gif"
import fish from "@/assets/fish.jpg"
// 因为mock的"@image"api可能已经无法使用了，所以mock获取到的图片地址访问不到，只能使用自己本地的图片
eventBus.$on("mainScroll", debounce(handleScroll, 50))
function handleScroll() {
    setImgs()
}
function setImgs() {
    for (const img of imgs) {
        setImg(img)
    }
}
function setImg(img) {
    img.dom.src = defaultImg; // 先设为默认图片地址
    const documentHeight = document.documentElement.clientHeight; // 整个文档视口高度
    const rec = img.dom.getBoundingClientRect()
    const recHeight = rec.height || 150; // 由于图片这个时候可能还没有加载过来，所以没有height，所以要设一个默认值
    if (rec.top >= -recHeight && rec.top <= documentHeight) { // 判断是否在视口范围内
        const imgLoading = new Image(); // 方法1加载图片 刚开始设置为默认图片，所以刚开始显示默认图片，
        imgLoading.onload = function () { // 当实际要显示的图片加载完后再将图片地址设置为显示实际要显示的图片
            img.dom.src = fish;// 由于默认图片加载比较快且浏览器可能会有缓存 所以刚开始先显示默认图片，然后再显示实际要显示的图片
            imgs = imgs.filter((i) => i !== img) // 除了刚设置的img，其他都留下来
        }
        imgLoading.src = fish; // 创建imgLoading的目的主要是为了看所需实际图片是否加载完成
        // img.dom.src = img.src;  方法2加载图片 虽然前面设置成显示默认图片，但第一次进入文章列表页时，满足条件的前几个dom元素在加载完图片之前已经运行到这段代码
        // imgs = imgs.filter((i) => i !== img) 所以当加载完显示图片时图片地址已经设置成了实际要显示的图片地址，所以一开始就
    }                                        // 显示实际要显示的图片，而不会一开始显示默认图片；而后面进行滚动去加载的话还是会先显示默认图片，然后再显示实际的图片
}
export default {
    inserted(el, bindings) { // 被绑定元素插入父节点时调用
        const img = {
            dom: el,
            src: bindings.value
        }
        imgs.push(img)
        setImg(img) // 每加入一个img元素都要判断一下是否要加载实际图片
    },
    unbind(el) { // 只调用一次，指令与元素解绑时调用
        imgs = imgs.filter((img) => img.dom !== el) // 在切换其他页面或切换分页时，将新获取的数据保留，如果是切换页面，因为没有重新获取数据，所以就把之前的数据全部清除
        // 如果是切换分页，全部数据与原来绑定的数据一对比就留下新获取的数据，移除之前的数据
    }
}