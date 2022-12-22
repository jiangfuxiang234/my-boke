<template>
  <div class="blog-detail-container">
    <h1>{{ blog.tiltle }}</h1>
    <div class="aside">
      <span>日期: {{ formatDate(blog.createDate) }}</span>
      <span>浏览量: {{ blog.scanNumber }}</span>
      <a href="#comment">评论: {{ blog.commentNumber }}</a>
      <RouterLink :to="{
        name: 'CategoryBlog',
        params:{
          categoryId: blog.category.id
        }
      }">{{blog.category.name}}</RouterLink>
      <!-- 这里踩了一个坑，给父组件Detail的混合组件配置fetchData的参数设置成了{}空对象，虽然是个空对象，
        但也是个数据，所以在v-if判断后，BlogDetail组件会进行加载，而这个blog数据是从父组件传过来又是异步的，
        所以在获取blog.catagory.name时这个数据可能还并没有加载完成，所以报了个"name undefined"的错误, 
        获取除name以外的数据则不会报错，可能获取mock数据是一层一层来的，name是在第二层，所以可能获取没有这么快，
        所以如果组件需要根据远程获取的数据来v-if的话最好将fetchData的参数设置为null   -->
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
    
  </div>
</template>

<script>
import { formatDate } from "@/utils"
import "@/styles/markdown.css"
import "highlight.js/styles/github.css";
export default {
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate
  }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

.aside {
  font-size: 12px;
  color: @gray;

  span,
  a {
    margin-right: 15px;
  }
}

.markdown-body {
  margin: 2em 0;
}
</style>
