<template>
  <img class="img-container" :src="loadingSrc" alt="">
</template>

<script>
import loadingSrc from "@/assets/loading.svg"
export default {
data(){
    return {
        loadingSrc
    }
}
}
</script>

<style lang="less" scoped>
@import "~@/styles/mixin.less";
.img-container{
    .self-center()
}
</style>