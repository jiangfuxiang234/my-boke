<template>
  <nav class="menu-container">
    <RouterLink v-for="item in items" :key="item.link" :to="{name:item.name}" :exact="item.exact" active-class="select"
      exact-active-class=""> 
      <!-- router-link-active为模糊匹配，但我们可以设置exat值来决定他是模糊匹配还是精确匹配，
      true为精确匹配，false为模糊匹配，也就是router-link-active既可以精确匹配，又可以模糊匹配，
    所以我们一般通过router-link-active来设置选中激活样式，router-link-exact-active精确匹配一般设置为空，
    我们也可以通过active-class="select"来为router-link-active重新设置类名 -->
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span>
        {{item.title}}
      </span>
    </RouterLink>
    <!-- <RouterLink/>也是vue的全局组件，本质上是一个a标签，但是点击后不会刷新页面，
         用了这个标签后href要改为to，这里to使用命名路由 -->
  </nav>
</template>
  
<script>
import Icon from '@/components/Icon';
export default {
  components: { Icon },
  data() {
    return {
      items: [
        {
          name: "Home",
          title: "首页",
          icon: "home",
          exact: true
        },
        {
          name: "Blog",
          title: "文章",
          icon: "blog",
          exact: false // 文章下面可能还有很多其他路径，但是不管文章下的什么路径，
                       // 文章的标签都是要选中状态，所以设置模糊匹配
        },
        {
          name: "About",
          title: "关于我",
          icon: "about",
          exact: true
        },
        {
          name: "Project",
          title: "项目&效果",
          icon: "code",
          exact: true
        },
        {
          name: "Message",
          title: "留言板",
          icon: "chat",
          exact: true
        },
      ],
    }
  },

}
</script>
  
<style scoped lang="less">
@import "~@/styles/var.less";

.menu-container {
  color: @gray;
  margin: 24px 0;

  a {
    &.select {
      background: darken(@words, 3%);
    }

    padding: 0 50px;
    display: block;
    display: flex;
    align-items: center;
    height: 45px;

    .icon {
      width: 24px;
    }

    &:hover {
      color: #fff;
    }
  }
}
</style>