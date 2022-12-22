<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea title="留言板" :subTitle="`${data.total}`" :list="data.rows" :isListLoading="isLoading"
      @submit="handleSubmit"/>
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea"
import fetchData from "@/mixins/fetchData.js"
import mainScroll from "@/mixins/mainScroll.js"
import * as msgApi from "@/api/message.js"
export default {
  mixins: [fetchData({ total: 0, rows: [] }), mainScroll("messageContainer")],
  // 这里区别于BlogComment组件要进行混入mainScroll是因为在Blog的BlogList组件里进行了混入，在加载Blog组件时
  // 就会加载BlogList组件，也就是一进入组件就混入执行了mainScroll，也就触发了mainScroll事件
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
    this.$bus.$on("mainScroll", this.handleScrolls)
  },
  destroyed() {
    this.$bus.$off("mainScroll", this.handleScrolls)
  },
  computed: {
    hasMore() { // 看是否还能加载更多，加载的是否有超过总数
      return this.data.rows.length < this.data.total
    }
  },
  methods: {
    async fetchData() {
      return await msgApi.getMessages(this.page, this.limit)
    },
    async handleSubmit(FormData, callback) {
      const resp = await msgApi.postMessage({
        blogId: this.$route.params.id,
        ...FormData
      });
      this.data.rows.unshift(resp); // 将新增的数据放到第一个
      this.data.total++; // 总数加1
      callback("感谢您的留言")
    },
    // 这里犯了一个大错误，这里的handleScroll方法和混合mainScroll的handleSroll方法重名被覆盖了，
    // 所以当滚动的时候是执行这里的handleScroll，而不是去执行mainScroll的handleScroll(mainScroll的handleScroll一直触发事件)，
    // 而执行这里的handleScroll时dom是事件源对象，所以没获取到dom元素也能进入该函数
    handleScrolls(dom){
      if (this.isLoading || !dom) {
        // 还在加载 或刚切换到这个组件，因为上个组件销毁时会触发不带dom的mainScroll事件，然后就会进入此if
        return
      }
      const range = 100; // 定一个加载更多评论的滚动范围，也就是滚动条到达底部的时候加载更多，在这个范围内都算到达底部
      const rec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
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
};
</script>

<style scoped>
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>
