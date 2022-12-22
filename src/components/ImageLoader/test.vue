<template>
  <div class="test-container">
    <ImageLoader
      src="https://img1.baidu.com/it/u=274908768,79200792&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1665766800&t=7f843272bee9bd5ff6d87de541c20a4a"
      placeholder="https://gimg3.baidu.com/search/src=http%3A%2F%2Fpics6.baidu.com%2Ffeed%2Fac6eddc451da81cb1669f2a81f7dc91d082431e9.jpeg%3Ftoken%3D0e253c7ef60d0d753ea304a62276b1ae&refer=http%3A%2F%2Fwww.baidu.com&app=2021&size=f360,240&n=0&g=0n&q=75&fmt=auto?sec=1665766800&t=ed30f47f377ac18254cf82a821c8037e"
      :duration="2000" @loader="handleLoaded()" />
  </div>
</template>

<script>
import ImageLoader from './index.vue';
export default {
  components: { ImageLoader },
  methods: {
    handleLoaded() {
      console.log("ImageLoader组件load事件触发，图片加载完成");
    },
  }
}
</script>

<style scoped lang="less">
.test-container {

  width: 500px;
  height: 400px;
  border: 2px solid;
  margin: 0 auto;
}
</style>