export default function (refvalue) { // 传入ref标记的Dom元素
    return {
        mounted() { // 注册滚动触发事件，因为要用到dom元素所以要在mounted(生成真实dom后)时绑定事件
            this.$refs[refvalue].addEventListener("scroll", this.handleScroll),
                this.$bus.$on("setMainScroll", this.handlesetMainScroll)
        },
        beforeDestroy() { // 组件销毁时移除事件，因为要用到dom元素所以要在beforeDestroy(组件销毁前)时移除事件，不然找不到dom元素
            this.$refs[refvalue].removeEventListener("scroll", this.handleScroll) // 滚动时触发mainScroll事件
            this.$bus.$emit("mainScroll");// 触发不带dom元素的mainScroll事件就是为了切换页面时可以将"回到顶部按钮"不显示
            this.$bus.$off("setMainScroll", this.handlesetMainScroll)
        },
        methods:{
            handleScroll() { // 触发mainScroll事件
                this.$bus.$emit("mainScroll", this.$refs[refvalue])
            },
            handlesetMainScroll(scrollTop) {
                this.$refs[refvalue].scrollTop = scrollTop;
            },
        }
    }
}