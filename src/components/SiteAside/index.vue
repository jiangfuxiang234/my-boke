<template>
  <div class="siteaside-container">
    <Avatar url="http://mdrs.yuanjin.tech/FgMwAPYq17So9nwVH44ltDHo7u3c" />
    <h1 class="title">龙傲天的小窝</h1>
    <Menu/>
    <Contact/>
    <p class="footer">
      {{data.icp}}
    </p>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar';
import Contact from './Contact';
import Menu from './Menu';
import  "@/styles/global.less";
import { mapState } from 'vuex';

export default {
    components: { Avatar, Contact, Menu },
    computed: mapState("setting",["data"])
    
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.siteaside-container{
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
}
.avatar-container{
  margin: 0 auto;
}
.footer{
  text-align: center;
  font-size: 12px;
}
.title{
  font-size: 1.2em;
  color: #fff;
  text-align: center;
}
</style>