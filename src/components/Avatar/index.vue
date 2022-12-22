<template>
  <img class="avatar-container" :src="url" :style="{ 
    width : size + 'px',
     height : size + 'px'
     }">
     <!-- style传值要以对象的形式 -->
</template>

<script>
export default {
props:{
    url:{
        type:String, //url属性类型必须为String
         required:true // 属性必须传
    },
    size:{
        type:Number,
        default: 150
    }
},

}
</script>

<style scoped>  
/* 带有作用域的样式 */
.avatar-container{
    border-radius: 50%;
    object-fit: cover;
    display: block;
}

</style>