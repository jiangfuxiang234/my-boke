<template>
    <div>
      <h1>App组件</h1>
    <Icon type="arrowDown"/>
  </div>
  </template>
  
  <script>
  import Icon from "./index.vue";
  export default {
    name:"App", // 如果组件没有在注册的时候指定名字，则使用该名字
    components:{
      Icon,
    },
  }
  </script>
  <style>
  /* 父组件可以影响子组件的根元素 */
  .iconfont { 
    font-size: 26px;
    color: red;
  }
  </style>
  
  