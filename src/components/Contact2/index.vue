<template>
    <div class="contact2-container">
        <a :href="`https:${data.github}`" class="icon" >
            <Icon type="github"/> 
            <span>{{data.githubName}}</span>
        </a>
        <a :href="`mailto:${data.mail}`" class="icon" >
            <Icon type="mail"/> 
            <span>{{data.mail}}</span>
        </a>
        <a class="icon" id="qq" :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`">
            <Icon type="qq"/> 
            <span>{{data.qq}}</span>
            <img :src="data.qqQrCode" class="qq"/>
        </a>
        <a class="icon" id="weixin">
            <Icon type="weixin"/> 
            <span>{{data.weixin}}</span>
            <img :src="data.weixinQrCode" class="weixin"/>
        </a>
    </div>
</template>

<script>
import Icon from '@/components/Icon';
import { mapState } from 'vuex';
export default {
    components: { Icon },
    computed: mapState("setting",["data"])
}
</script>

<style scoped lang="less">
.icon-container{
    font-size: 25px; 
    background:rgba(255,255, 255, 0)
}
.icon{
    margin: 20px 5px;
    display: block;
    &:hover{
      color:rgb(114,157,236);
    }
}

a{
    text-decoration: none;
    color: rgb(154,154,154);
    cursor: pointer;
}
.icon-container{
    width: 100%;
}
.qq{
    width: 100px;
    height: 0;
    left: 20px;
    top: 20px;
    background: white;
    position: absolute;
    transition: height .2s linear 0s
}

#qq:hover{
   .qq{
    height: 100px;
   }
}

.weixin{
    width: 100px;
    height: 0;
    left: 20px;
    top: 66px;
    background: white;
    position: absolute;
    transition: .5s;
}
.weixin::after{
    width: 50px;
    height: 50px;
    background: white;
}

#weixin:hover{
   .weixin{
    height: 100px;
   }
}
.contact-container{
    position: relative;
}

</style>