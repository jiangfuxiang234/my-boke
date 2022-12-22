<template>
    <div class="blog-list-container" ref="mainContainer" v-loading="isLoading">
        <ul>
            <li v-for="item in data.rows" :key="item.id">
                <div class="thumb" v-if="item.thumb">
                    <RouterLink :to="{
                        name: 'BlogDetail',
                        params: {
                            id: item.id
                        }
                    }">
                        <img v-Lazy="item.thumb" :alt="item.tiltle" :title="item.tiltle">
                    </RouterLink>
                </div>
                <div class="main">
                    <RouterLink :to="{
                        name: 'BlogDetail',
                        params: {
                            id: item.id
                        }
                    }">
                        <h2>{{ item.title }}</h2>
                    </RouterLink>
                    <div class="aside">
                        <span>日期：{{ formatDate(item.createDate) }}</span>
                        <span>浏览：{{ item.scanNumber }}</span>
                        <span>评论：{{ item.commentNumber }}</span>
                        <RouterLink :to="{
                            name: 'CategoryBlog',
                            params: {
                                categoryId: item.category.id
                            }
                        }">{{ item.category.name }}
                        </RouterLink>
                    </div>
                    <div class="desc">
                        {{ item.description }}
                    </div>
                </div>
            </li>
        </ul>
        <Empty v-if="data.rows.length === 0 && !isLoading" />
        <!-- 没有数据并且已经加载完成则显示Empty组件，因为正在加载中时也是无数据的情况，
             但这种情况我们不需要显示Empty组件 -->
        <Pager v-if="data.total" :total="data.total" :current="routeInfo.page" :limit="routeInfo.limit"
            :visibleNumber="10" @pageChange="handlePageChange" />
    </div>
</template>

<script>
import Pager from "@/components/Pager"
import { formatDate } from "@/utils"
import { getBlogs } from "@/api/blog"
import fetchData from "@/mixins/fetchData"
import mainScroll from "@/mixins/mainScroll"
import Empty from "@/components/Empty"
export default {
    mixins: [fetchData({ total: 0, rows: [] }), mainScroll("mainContainer")],
    components: {
        Pager,
        Empty
    },
    computed: { // 获取路由信息
        routeInfo() {
            const page = +this.$route.query.page || 1; // 第一次点进文章时用的都是默认值
            const limit = +this.$route.query.limit || 10;
            const categoryId = +this.$route.params.categoryId || -1;
            return {
                page,
                limit,
                categoryId
            }
        }
    },

    methods: {
        formatDate, // 格式化时间方法
        async fetchData() { // 获取数据
            return await getBlogs(
                this.routeInfo.page,
                this.routeInfo.limit,
                this.routeInfo.categoryId
            )
        },
        handlePageChange(newpage) { // 在进入文章页后，要点击分页或右边的分类后，地址栏才会带上page和limit，因为点击后会进行路由跳转，地址里带上了这些参数
            const query = {
                page: newpage,
                limit: this.routeInfo.limit
            };
            if (this.routeInfo.categoryId === -1) {
                this.$router.push({ // 在代码中跳转页面
                    name: "Blog",
                    query
                })
            } else {
                this.$router.push({
                    name: "CategoryBlog",
                    query,
                    params: {
                        categoryId: this.routeInfo.categoryId
                    }
                })
            }
        }

    },
    watch: { // 监控路由变化，一变化就重新开始加载数据
        async $route() {
            this.isLoading = true;
            this.$refs.mainContainer.scrollTop = 0;
            this.data = await this.fetchData();
            this.isLoading = false;
        }
    }

}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

.blog-list-container {
    line-height: 1.7;
    position: relative;
    padding: 20px;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    scroll-behavior: smooth;

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }
}

li {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid @gray;

    .thumb {
        flex: 0 0 auto;
        margin-right: 15px;

        img {
            display: block;
            max-width: 200px;
            border-radius: 5px;
        }
    }

    .main {
        flex: 1 1 auto;

        h2 {
            margin: 0;
        }
    }

    .aside {
        font-size: 12px;
        color: @gray;

        span {
            margin-right: 15px;
        }
    }

    .desc {
        margin: 15px 0;
        font-size: 14px;
    }
}
</style>