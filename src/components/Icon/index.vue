<template>
  <i class="iconfont icon-container" :class="classfont"></i>
</template>

<script>
const classMap = {
    home: "iconzhuye",
  success: "iconzhengquetishi",
  error: "iconerror",
  close: "iconguanbi",
  warn: "iconjinggao",
  info: "iconxinxi",
  blog: "iconblog",
  code: "iconcode",
  about: "iconguanyuwo",
  weixin: "icon88",
  mail: "iconemail",
  github: "icongithub",
  qq: "iconQQ",
  arrowUp: "iconarrowup",
  arrowDown: "iconarrowdown",
  empty: "iconempty1",
  chat: "iconliuyan",
}
export default {
   props:{
    type:{
        type: String,
        require: true
    }
   },
   computed:{
    classfont(){
        return classMap[this.type]
    }
   }
}
</script>

<style>
@import "//at.alicdn.com/t/c/font_3691841_f3f6bv7zjsr.css";
.iconfont {
  color: inherit;
  font-size: inherit;
}
</style>