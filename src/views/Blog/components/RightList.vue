<template>
  <ul class="right-list-container">
    <li v-for="(item, i) in list" :key="i">
      <span @click="handleClick(item)" :class="{ active: item.isSelect }">
        {{ item.name }}
      </span>
      <span
        v-if="item.aside"
        @click="handleClick(item)"
        class="aside"
        :class="{ active: item.isSelect }"
      >
        {{ item.aside }}
      </span>
      <RightList :list="item.children" @select="handleClick(item)" />
    </li>

  </ul>
</template>

<script>
export default {
  name: "RightList", // 对组件进行命名就可以在组件里面用自己，进行递归
  props: {
    list: {
      type: Array,
      default: () => [] // 箭头函数返回一个空数组
    }
  },
  methods: {
    handleClick(item) {
      this.$emit("select", item)
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

.right-list-container {
  list-style: none;
  padding: 0;

  .right-list-container {
    margin-left: 1em;
  }

  li {
    min-height: 40px;
    line-height: 40px;
    cursor: pointer;

    .active {
      color: @warn;
      font-weight: bold;
    }
  }
}
.aside {
  font-size: 12px;
  margin-left: 1em;
  color: @gray;
}
</style>