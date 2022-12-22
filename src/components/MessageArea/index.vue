<template>
    <div class="message-area-container">
      <DataForm v-on="$listeners" />
      <!-- 父组件注册的事件函数传递给子组件 -->
      <h3>
        {{ title }}
        <span>{{ subTitle }}</span>
      </h3>
      <DataList :list="list" />
      <div class="loading" v-loading="isListLoading"></div>
    </div>
  </template>

<script>
import DataForm from './DataForm.vue';
import DataList from './DataList.vue';
export default {
components:{
    DataForm,
    DataList
},
created(){
  
},
props:{
    title:{
        type:String,
        default:""
    },
    subTitle:{
        type: String,
        default: ""
    },
    list:{
        type:Array,
        default:()=>[]
    },
    isListLoading:{
        type:Boolean,
        default:false
    }
}
}
</script>

<style scoped lang="less">
.loading {
  position: relative;
  height: 100px;
}
</style>