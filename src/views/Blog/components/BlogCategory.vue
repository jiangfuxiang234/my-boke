<template>
    <div class="blog-category-container" v-loading="isLoading">
        <h2>文章分类</h2>
        <RightList :list="list" @select="handleSelect" />
    </div>
</template>

<script>
import RightList from './RightList.vue'
import fetchData from "@/mixins/fetchData"
import { getBlogCategories } from "@/api/blog"
export default {
    mixins: [fetchData([])],
    components: {
        RightList
    },
    computed: {
        limit() {
            return +this.$route.query.limit || 10
        },
        categoryId() {
            return +this.$route.params.categoryId || -1
        },
        list() {
            const totalArticleNumber = this.data.reduce((a, b) => a + b.articleCount, 0); // 计算全部文章数量
            const result = [
                { name: "全部", id: -1, articleCount: totalArticleNumber }, // 相当于多加一项"全部"
                ...this.data
            ];
            return result.map((it) => ({ // 给每一项多加两个属性
                ...it,
                isSelect: it.id === this.categoryId,
                aside: `${it.articleCount}篇`,
            })

            )

        }
    },
    methods: {
        async fetchData() {
            return await getBlogCategories()
        },
        handleSelect(item) {
            const query = {
                limit: this.limit,
                page: 1
            }
            if(item.id === -1){
                this.$router.push({
                    name:"Blog",
                    query
                })
            }else{
                this.$router.push({
                    name:"CategoryBlog",
                    query,
                    params:{
                        categoryId: item.id
                    }
                })
            }
        }
    }
}
</script>

<style scoped lang="less">
.blog-category-container {
  width: 300px;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  height: 100%;
  overflow-y: auto;
  h2 {
    font-weight: bold;
    letter-spacing: 2px;
    font-size: 1em;
    margin: 0;
  }
}
</style>
