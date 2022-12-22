<template>
  <div class="blog-comment-container" id="comment">
    <MessageArea title="评论列表" :subTitle="`(${data.total})`" :list="data.rows" :isListLoading="isLoading"
      @submit="handleSubmit" />
    <!-- subTitle值的类型为String，而"data.totle"获取的是Number类型，所以在""里面还要用模板字符串来获取total的值， -->
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea"
import fetchData from "@/mixins/fetchData.js"
import { postComment, getComments } from "@/api/blog"
export default {
  mixins: [fetchData({ total: 0, rows: [] })],
  components: {
    MessageArea
  },
  data() {
    return {
      page: 1,
      limit: 10
    }
  },
  created() {
    this.$bus.$on("mainScroll", this.handleScroll)
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll)
  },
  computed: {
    hasMore() { // 看是否还能加载更多，加载的是否有超过总数
      return this.data.rows.length < this.data.total
    }
  },
  methods: {
    async fetchData() {
      return await getComments(this.$route.params.id, this.page, this.limit);
    },
    async handleSubmit(FormData, callback) {
      const resp = await postComment({
        blogId: this.$route.params.id,
        ...FormData
      });
      this.data.rows.unshift(resp); // 将新增的数据放到第一个
      this.data.total++; // 总数加1
      callback("评论成功")
    },
    handleScroll(dom) {
      if (this.isLoading || !dom) {
        // 还在加载 或刚切换到这个组件，因为上个组件销毁时会触发不带dom的mainScroll事件，然后就会进入此if
        return
      }
      const range = 100; // 定一个加载更多评论的滚动范围，也就是滚动条到达底部的时候加载更多，在这个范围内都算到达底部
      const rec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      console.log(dom.scrollTop, dom)
      if (rec <= range) {
        this.fetchMore()
      }
    },
    // 加载下一页
    async fetchMore() {
      if (!this.hasMore) {
        // 加载的超过总数
        return
      }
      this.isLoading = true;
      this.page++;
      const resp = await this.fetchData();
      this.data.total = resp.total; // 其实total可以不用重新赋值，因为在Mock里total是写死的，每次获取都是固定值
      this.data.rows = this.data.rows.concat(resp.rows); // 数组连接，将原来的数据和新获取的数据拼接在一起
      this.isLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.blog-comment-container {
  margin: 30px 0;
}
</style>