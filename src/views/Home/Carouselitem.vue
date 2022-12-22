<template>
  <div class="carousel-item-container" ref="container" @mousemove="handleMousemove" @mouseleave="handleMouseleave">
    <div class="carousel-img" :style="imagePosition" ref="inner">
      <ImageLoader @loader="this.showWords" :src="carousel.bigImg" :placeholder="carousel.midImg" />
    </div>
    <div class="title" ref="title">{{ carousel.title }}</div>
    <div class="desc" ref="desc">{{ carousel.description }}</div>
  </div>
</template>
  
<script>
import ImageLoader from "@/components/ImageLoader"
export default {
  props: ["carousel"],
  components: {
    ImageLoader
  },

  data() {
    return {
      titleWidth: 0,
      descWidth: 0,
      containerSize: null, // 外层容器的尺寸
      innerSize: null, // 内层图片的尺寸
      mouseX: 0, // 鼠标在container容器里面的横坐标
      mouseY: 0  // 鼠标在container容器里面的纵坐标
    }

  },
  computed: {
    extraSize() {
      return {
        width: this.innerSize.width - this.containerSize.width,
        height: this.innerSize.height - this.containerSize.height
      }
    },
    centerSize() { // 获取中间坐标
      const X = this.containerSize.width / 2;
      const Y = this.containerSize.height / 2;
      return {
        X,
        Y
      }
    },
    imagePosition() { // 获取图片位置，随着鼠标移动(mouseX/Y变化)而变化
      if (!this.innerSize && !this.containerSize ) { // 这里要做一个判断，innerSize和containerSize都获取到值后再进行下一步
        return
      }
      // 这是我的方法获取left和top的值，将extraSize写成计算属性
      const left = (-this.extraSize.width / this.containerSize.width) * this.mouseX;
      const top = (-this.extraSize.height / this.containerSize.height) * this.mouseY;
      // 下面是老师的方法获取left和top的值
      // const extraWidth = this.innerSize.width - this.containerSize.width;
      // const extraHeight = this.innerSize.height - this.containerSize.height;
      // const left = (-extraWidth / this.containerSize.width) * this.mouseX;
      // const top = (-extraHeight / this.containerSize.height) * this.mouseY;
      return {
        transform: `translate(${left}px, ${top}px)`
      };
    },
  },
  mounted() {
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize(); // 获取innerSize和containerSize的值
    this.mouseX = this.centerSize.X; // 一开始图片位置在中间
    this.mouseY = this.centerSize.Y
    window.addEventListener("resize", this.setSize) // 尺寸发生变化时(改变窗口大小会导致尺寸发生变化)重新获取Size值
  },
  destroyed() {
    window.removeEventListener("resize", this.setSize) // 在组件销毁后也移除该事件
  },
  methods: {
    // 显示文字
    showWords() {
      // 文字动画显示的逻辑是开始将文字的opacity设为0，
      // 获取到宽度后再将opacity设为1，同时宽度设为0，
      // 然后再由动画显示出来，这样就可以做到不显示文字也能获取到文字的宽度，
      // 这样做的原因是，width从0到auto是没有transition动画的，
      // 一定要有一个确切的宽度值，所以我们要在opacity为0的时候
      // 获取到文字的宽度值

      // 标题
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      this.$refs.title.clientWidth; // reflow
      this.$refs.title.style.transition = "1s";
      this.$refs.title.style.width = this.titleWidth + "px";

      // 描述
      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      this.$refs.desc.clientWidth; // reflow
      this.$refs.desc.style.transition = "2s 1s"; // 延迟1s，在标题过渡完之后再开始过渡
      this.$refs.desc.style.width = this.descWidth + "px"
    },
    setSize() { // 获取containerSize和innerSize
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight
      };
      this.innerSize = {
        width: this.$refs.inner.clientWidth,
        height: this.$refs.inner.clientHeight
      };
    },
    handleMousemove(e) { // 鼠标移入事件
      const rect = this.$refs.container.getBoundingClientRect();
      const rectLeft = rect.left;
      const rectTop = rect.top;
      this.mouseX = e.clientX - rectLeft;
      this.mouseY = e.clientY - rectTop;
      
    },
    handleMouseleave() { // 鼠标移出事件，回到中间位置
      this.mouseX = this.centerSize.X;
      this.mouseY = this.centerSize.Y
    }

  },

}

</script>
  
<style lang="less" scoped>
@import "~@/styles/var.less";

.carousel-item-container {
  // background: @dark;
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  // z-index: -1;    
// 踩了一个大坑，将容器设为z-index: -1后(也就是将子组件放到父组件下面)，
// 这样子组件根元素绑定的鼠标移入事件不会生效, 相当于鼠标触摸不到子组件,
// 其他事件也是如此，比如点击事件等
  overflow: hidden;
}

.carousel-img {
  width: 110%;
  height: 110%;
  left: 0;
  top: 0;
  position: absolute;
  transition: .3s;
}

.title,
.desc {
  position: absolute;
  letter-spacing: 3px; // 文字间距
  left: 30px;
  color: #fff;
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.5), -1px 0 0 rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(0, 0, 0, 0.5); // 设置上下左右的阴影，
  white-space: nowrap; // 避免背景比较亮的时候文字会看不到
  overflow: hidden;
  opacity: 0;
}

.title {
  top: calc(50% - 40px);
  font-size: 2em;
}

.desc {
  top: calc(50% + 20px);
  font-size: 1.2em;
  color: lighten(@gray, 20%); // 描述文字设暗一点
}
</style>

  