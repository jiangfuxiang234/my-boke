<template>
    <div>
      <h1>App组件</h1>
    <Page :current="current" :total="total" 
    @pageChange = "handlePageChange($event)"/>
    <!-- $event的数据是由pageChange得来的 -->
  </div>
  </template>
  
  <script>
  import Page from "./index.vue";
  export default {
    name:"App", // 如果组件没有在注册的时候指定名字，则使用该名字
    components:{
      Page
    },
    data(){
      return {
       total: 202,
       current: 1
      }
    },
    methods:{
      handlePageChange(newPage){
        this.current = newPage;
        console.log("加载新页面")
      }
    }
  }
  </script>
  <style>

  </style>
  
  