<template>
  <div class="imageloader-container">
  <img v-if="!everythingDone" class="placeholder" :src="placeholder" />
  <img @load="handleLoad()" 
  :src="src" 
  :style="{ opacity: originOpacity, transition: `${duration}ms` }"  />
  </div>
</template>

<script>
export default {
props: {
    src:{
        type: String,
        required: true
    },
    placeholder:{
        type: String,
        required: true
    },
    duration: {
        type: Number,
        default: 500
    },
},
data(){
    return {
        originLoaded: false, //  原图是否加载完成
      everythingDone: false, // 是否一切都尘埃落定了
    }
},
methods:{
    handleLoad(){
     this.originLoaded = true
     setTimeout(()=>{  // 这里一定要用箭头函数，里面要用this
        this.everythingDone = true;
        this.$emit("loader")
     },this.duration)
     
    }
},
computed:{
    originOpacity(){
    return this.originLoaded ? 1 : 0
}
}

}
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.imageloader-container{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    img{
        .self-fill();
        object-fit: cover; // 防止图片挤压变形
    }
}
.placeholder{
    filter: blur(5vw); // 模糊
}

</style>