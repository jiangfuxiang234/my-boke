import loadingSrc from "@/assets/loading.svg"

import styles from "./loading.module.less"
// 得到el中loading效果的img元素
function getLoadingImg(el) {
    return el.querySelector("img[data-role=loading]")
}

function creatLoadingImg() {
    const img = document.createElement("img");
    img.dataset.role = "loading"
    img.className = styles.loading;
    img.src = loadingSrc;
    return img;
}

export default function(el, binding){
    const curImg = getLoadingImg(el);
    // 根据binding的value值来决定创建或删除img
    if(binding.value){
        if(!curImg){
            const img = creatLoadingImg();
            el.appendChild(img);
        }
    }else{
        if(curImg){
            curImg.remove()
        }
    }
}