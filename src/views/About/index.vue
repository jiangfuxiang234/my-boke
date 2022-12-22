<template>
  <div class="about-container" v-Loading="loading || !srcLoaded">
                                         <!-- 正在获取仓库数据或未加载完src数据时显示Loading效果 -->
    <iframe class="about-content" 
    v-if="src" 
    :src="src"
     @load="srcLoaded = true"
     frameborder="0">
    <!-- src的所有文件(css、js等文件)加载完成设为true -->
    </iframe>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      srcLoaded: false
    }
  },
  computed: mapState("about", {
    src: "data", // 给获取的data数据改名
    loading: "loading"
  }),
  created() {
    this.$store.dispatch("about/fetchAbout")
  }
};
</script>

<style scoped lang="less">
.about-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.about-content {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
}
</style>