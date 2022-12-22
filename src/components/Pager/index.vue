<template>
    <!-- v-if：满足条件才显示 -->
  <div class="pager-container" v-if="pageNumber > 1"> 
    <!-- 当前页为1时带disabled类 -->
   <a @click="handleClick(1)" :class="{disabled: current === 1}">|&lt;&lt;</a>
   <a @click="handleClick(current - 1)" :class="{disabled: current === 1}">&lt;&lt;</a>
   <a @click="handleClick(n)" v-for="(n, i) in numbers" :key="i" :class="{active: current === n}">{{n}}</a>
   <a @click="handleClick(current + 1)" :class="{disabled: current === pageNumber}">&gt;&gt;</a>
   <a @click="handleClick(pageNumber)" :class="{disabled: current === pageNumber}">&gt;&gt;|</a>
  </div>
</template>

<script>
export default {
props:{
    total:{ // 总条数
        type: Number,
        default: 0
    },
    current:{ // 当前页码
        type: Number,
        default: 1
    },
    limit:{ // 每页显示的条数
        type: Number,
        default: 10
    },
    visibleNumber:{ // 每次显示的分页数量
        type: Number,
        default: 10}
},
computed:{
    pageNumber(){ // 总页数
        return Math.ceil(this.total / this.limit)// 向上取整
    },
    visibleMin(){ // 得到显示的最小数字
        let min;
        min = this.current - Math.floor(this.visibleNumber / 2);
        if(min < 1){
            min = 1;
        }
        return min
    },
    visibleMax(){ // 得到显示的最大数字
        let max;
        max = this.visibleMin + this.visibleNumber - 1;
        if(max > this.pageNumber){
            max = this.pageNumber
        }
        return max
    },
     numbers(){ //得到显示页数的数组
        let nums = [];
        for(let i = this.visibleMin; i <= this.visibleMax; i++){
            nums.push(i)
        }
        return nums;
     }
},
methods:{
    // 为了避免父组件的数据混乱，所以我们不应该通过子组件去改父组件的数据，
    // 而应该通过子组件抛出事件来向父组件告知，由父组件来决定如何处理数据
    handleClick(newPage){
        if(newPage < 1){
            newPage = 1;
        }
        if(newPage > this.pageNumber){
            newPage = this.pageNumber
        }
        if(newPage === this.current){
            return
        }
        console.log("点击了")
        // 抛出一个事件
        this.$emit("pageChange", newPage)
    }
}
}
</script>

<style lang="less" scoped>
// 在style里面~@代表src目录
@import "~@/styles/var.less";  
.pager-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  a {
    color: @primary;
    margin: 0 6px;
    cursor: pointer;
    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }
    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }
}

</style>