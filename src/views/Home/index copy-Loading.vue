<template>
  <!-- 写这一部分是犯了两个错误，一是单词拼写错误，导入getBanners时少了个s，
  因为是局部导入，所以要和导出的名字一致；二是没有联系到Mock获取到的数据，
  在mock/banners.js里将code设置成了406，这样根据api/request.js是获取不到数据的；
  还踩了一个坑，就是将vue卸载安装到全局后，@vue/cli-service-global(测试插件)也会跟着一起被卸载，
  所以也还要全局安装一下此插件npm install -g @vue/cli-service-global -->
  <div class="home-container" ref="container" @wheel="handleWheel">
    <ul class="carousel-container" @transitionend="handleTransitionEnd" :style="{ marginTop, }">
      <!-- 这里是简写，其实就是{marginTop: marginTop} -->
      <li v-for="item in banners" :key="item.id">
        <Carouselitem :carousel="item"/>
        <!-- 给Carouselitem组件传入参数carousel -->
      </li>
    </ul>
    <!-- 第一页或最后一页不显示上下标 -->
    <div class="icon icon-up" v-show="index >= 1" @click="switchTo(index - 1)">
      <Icon type="arrowUp" />
    </div>
    <div class="icon icon-down" v-show="index < banners.length - 1" @click="switchTo(index + 1)">
      <Icon type="arrowDown" />
    </div>
    <ul class="indicator">
      <li v-for="(item, i) in banners" :key="item.id" @click="switchTo(i)" :class="{ active: i === index }">
      </li>
    </ul>
    <Loading v-if="isLoading"/>
  </div>
</template>

<script>
import { getBanners } from "@/api/banner"
import Carouselitem from './Carouselitem.vue'
import Icon from "@/components/Icon"
import Loading from "@/components/Loading"
export default {
  components: {
    Carouselitem,
    Icon,
    Loading
  },
  data() {
    return {
      banners: [], // 获取到的数据
      index: 0, // 展示页的索引
      containerHeight: 0, // 容器(ul)的高度
      switching: false, // 是否正在切换中
      isLoading: true
    }
  },
  async created() { // 异步获取banners数据
    this.banners = await getBanners();
    this.isLoading = false
  },
  mounted() {  // 获取容器(ul)的高度，mounted是在挂载完真实Dom后执行
    this.containerHeight = this.$refs.container.clientHeight;
    window.addEventListener("resize", this.handleResize)
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize)
  },
  computed: {
    marginTop() {
      return -this.index * this.containerHeight + "px"
    }
  },
  methods: {
    switchTo(i) {
      this.index = i
    },
    handleWheel(e) { // 鼠标滚动翻页
      if (this.switching) {
        return
      }
      if (e.deltaY < -5 && this.index > 0) {  // 往上滚动
        this.switching = true;
        this.index--;
      } else if (e.deltaY > 5 && this.index < this.banners.length - 1) { // 往下滚动
        this.switching = true;
        this.index++;
      }
    },
    handleTransitionEnd() { // ul动画过渡结束执行此函数，说明切换完成
      this.switching = false
    },
    handleResize() {
      this.containerHeight = this.$refs.container.clientHeight;
    }
  }

}
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";

.home-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  // 测试
  // width: 60%;
  // height: 40%;
  // overflow: visible;
  // border: 2px solid #008c8c;
  // margin: 100px auto;

  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }
}

.carousel-container {
  width: 100%;
  height: 100%;
  transition: 500ms;

  li {
    width: 100%;
    height: 100%;
  }
}

.icon {
  .self-center();
  font-size: 30px;
  @gap: 25px;
  color: @gray;
  cursor: pointer;
  transform: translateX(-50%);

  &.icon-up {
    top: @gap;
    animation: jump-up 2s infinite;
  }

  &.icon-down {
    top: auto;
    bottom: @gap;
    animation: jump-down 2s infinite;
  }

  @jump: 5px;

  @keyframes jump-up {
    0% {
      transform: translate(-50%, @jump);
    }

    50% {
      transform: translate(-50%, -@jump);
    }

    100% {
      transform: translate(-50%, @jump);
    }
  }

  @keyframes jump-down {
    0% {
      transform: translate(-50%, -@jump);
    }

    50% {
      transform: translate(-50%, @jump);
    }

    100% {
      transform: translate(-50%, -@jump);
    }
  }
}

.indicator {
  .self-center();
  transform: translateY(-50%);
  left: auto;

  right: 20px;

  li {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: @words;
    cursor: pointer;
    margin-bottom: 10px;
    border: 1px solid #fff;
    box-sizing: border-box;

    &.active {
      background: #fff;
    }
  }
}
</style>
