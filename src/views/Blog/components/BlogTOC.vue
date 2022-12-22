<template>
  <div class="blog-toc-container">
    <h2>目录</h2>
    <RightList :list="tocWithSelect" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from './RightList.vue'
import { debounce } from "@/utils"
export default {
  components: { RightList },
  props: {
    toc: {
      type: Array
    }
  },
  data() {
    return {
      activeAnchor: ""
    }
  },
  computed: {
    tocWithSelect() { // 根据toc的anchor属性和activeAnchor得到的带有isSelect的新toc数组
      const getTOC = (toc = []) => {
        return toc.map((t) => ({
          ...t,
          isSelect: t.anchor === this.activeAnchor,
          children: getTOC(t.children) // 通过递归获得children数据
        }))
      }
      return getTOC(this.toc)
    },
    doms() { // 根据toc的anchor属性得到对应的dom元素
      const doms = [];
      const getdom = (toc) => {
        for (const t of toc) {
          doms.push(document.getElementById(t.anchor));
          if (t.children && t.children.length) {
            getdom(t.children) // 通过递归获得children元素
          }
        }
      }
      getdom(this.toc);
      return doms

    },
  },

  created() {
    this.setSelectDebounce = debounce(this.setSelect, 50); // 对函数进行防抖处理
    this.$bus.$on("mainScroll", this.setSelectDebounce) // 监听mainScroll事件
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.setSelectDebounce) // 组件销毁时取消监听mainScroll事件
  },
  methods: {
    handleSelect(item) {
      location.hash = item.anchor
    },
     // 设置activeAnchor为正确的值
    setSelect() {
      this.activeAnchor = "" //由于后续要重新设置 每次触发都要清空一下(其实可以不用重新清空)
      const range = 200; // 规定dom元素被选中的范围
      // 看一下哪个dom元素应该被选中
      for (const dom of this.doms) {
        if (!dom) {
          continue
        }
        const top = dom.getBoundingClientRect().top; // 得到元素离视口顶部的距离
        if (top >= 0 && top <= range) {
          // 在规定的范围内
          this.activeAnchor = dom.id;
          return
        } else if (top > range) {
          // 在规定的范围下方
          return
        } else { // 这种情况就是该标题dom在视口顶部以上，先不管其他情况先给activeAnchor赋值，
                 // 如果判断下一个标题dom时发现top在0-range之间，则会覆盖activeAnchor的值，
                 // 没有就还是刚开始的值
          this.activeAnchor = dom.id
        }
      }
    }
  }
}

</script>

<style scoped lang="less">
.blog-toc-container {
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>