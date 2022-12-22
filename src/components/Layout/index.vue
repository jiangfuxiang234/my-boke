<template>
  <div class="layout-container">
    <div class="left">
        <slot name="left"></slot>
    </div>
    <div class="main">
        <slot></slot>
    </div>
    <div class="right">
        <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.layout-container {
  width: 100%;
  height: 100%;
  display: flex;
  .left,
  .right {
    flex: 0 0 auto; // 不伸缩，固定
    overflow: hidden;
  }
  .main {
    flex: 1 1 auto; // 随着容器伸缩
    overflow: hidden;
  }
}
</style>