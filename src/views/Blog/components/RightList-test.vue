<template>
  <div class="test">
<RightList :list="list" @select="handleSelect"/>
<!-- 踩了一个坑, 子组件抛出事件的处理函数执行时不能传参数，
因为他会从配置里面找，所以传入了会报undefind错注册的时候要传入参数 -->
  </div>
</template>

<script>
import RightList from "./RightList.vue"
export default {
components:{
    RightList
},
data(){
    return{
        list: [
        { name: "a", isSelect: false },
        { name: "b", isSelect: false },
        {
          name: "c",
          isSelect: true,
          children: [
            { name: "c-1", isSelect: false },
            {
              name: "c-2",
              isSelect: false,
              children: [
                { name: "c-2-1", isSelect: false },
                { name: "c-2-2", isSelect: false },
                { name: "c-2-3", isSelect: false },
                { name: "c-2-4", isSelect: false },
              ],
            },
            { name: "c-3", isSelect: false },
            { name: "c-4", isSelect: false },
          ],
        },
        { name: "d", isSelect: false },
      ],
    }
},
methods:{
    handleSelect(item){
      console.log(item)
    }
}
}
</script>

<style>

</style>