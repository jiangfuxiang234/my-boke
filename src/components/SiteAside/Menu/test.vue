<template>
    <div class="test-container">
      <Contact2/>
    </div>
  </template>
  
  <script>
  import Contact2 from './index.vue';
  import  "@/styles/global.less"; // 加载全局样式，这里目的是清除a元素的默认样式
  export default {
      components: { Contact2 }
  }
  </script>
  
  <style>
  .test-container{
      width: 400px;
      height: 400px;
      border: 2px solid red;
      background: #000;
      margin: 0 auto;
      padding-top: 200px;
  }
  </style>