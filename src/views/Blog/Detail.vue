<template>
  <Layout>
    <div class="main-container" ref="mainContainer" v-loading="isLoading">
      <BlogDetail :blog="data" v-if="data" />
      <BlogComment v-if="!isLoading" />
    </div>

    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="data.toc" v-if="data" />
      </div>

    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout"
import BlogDetail from './components/BlogDetail.vue'
import { getBlog } from "@/api/blog"
import fetchData from "@/mixins/fetchData"
import mainScroll from "@/mixins/mainScroll"
import BlogTOC from './components/BlogTOC.vue'
import BlogComment from "./components/BlogComment.vue"
import { titleController } from "@/utils"
export default {
  mixins: [fetchData(null), mainScroll("mainContainer")], // 传入dom元素标记名称(ref)
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment
  },
 
  methods: {
    async fetchData() {
      let resp = await getBlog(this.$route.params.id);
      // resp = null 模拟没有返回数据
      if(!resp){
        this.$router.push("/404") // 随便跳转一个地址，路由没匹配到的都是跳转到NotFound组件
        return
      }
      if(resp.title){ // 已进入文章详情组件就重新设置路由标题，一开始路由标题是文章详情，当数据加载完就根据title来显示路由标题
        titleController.setRouterTitle(resp.title)
      }
      return resp
    },
  },
  updated(){ // 这种做法就是为了实现点击了某个目录跳转后，再刷新页面还需要跳转到之前的地方，没有经过此处理刷新后则回到顶部，因为刷新后hash值没有改变(整个路由地址都没变)，不会重新进行跳转
    const hash = location.hash; // 实现的方法就是在刷新页面重新获取数据后，将路由地址的hash保存起来，同时将hash设为空，一段时间后再设为保存的hash值(试验过，其实可以不用过一段时间，只要保证hash值有变化就可以实现刷新跳转)
    location.hash = "";         // 如果只是滚动到某个地方再刷新页面，经过此处理也不会重新跳转，因为滚动只是单纯通过滚动来跳转，并不是通过改变路由的hash值来跳转，所以路由上也没有hash值，获取的hash值也是空，怎么改变也还是一样，
    setTimeout(()=>{            // 而点击是通过改变路由的hash值来跳转的，所以经过此处理hash值会变化，所以可以做到刷新跳转
      location.hash = hash
    }, 50)
  }
}
</script>

<style scoped lang="less">
.main-container {
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>
