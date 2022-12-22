<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="aside">
        <SiteAside />
        </div>
      </template>
      <template #default>
        <RouterView/> 
        <!-- <RouterView/>为vue的全局组件，匹配到的组件会渲染到这里 -->
      </template>
    </Layout>
    <ToTop/>
  </div>
</template>

<script>
import Layout from './components/Layout';
import SiteAside from './components/SiteAside/index.vue';
import ToTop from "./components/ToTop"

export default {
  components: { 
    Layout,
    SiteAside,
    ToTop
  }
}
</script>
<style lang="less" scoped>
@import "~@/styles/mixin.less";
.app-container {
  .self-fill(fixed);
  
}
.aside {
  width: 250px;
  height: 100%;
}
</style>

