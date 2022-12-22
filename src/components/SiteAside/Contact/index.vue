<template>
  <ul class="contact-container">
    <li>
      <a :href="data.github">
        <div class="icon">
          <Icon type="github" />
        </div>

        <span>
          {{data.githubName}}
        </span>
      </a>
    </li>
    <li>
      <a :href="`mailto:${data.mail}`">
        <div class="icon">
          <Icon type="mail" />
        </div>

        <span>
          {{data.mail}}
        </span>
      </a>
    </li>
    <li>
      <a :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`">
        <div class="icon">
          <Icon type="qq" />
        </div>

        <span>
          {{data.qq}}
        </span>
      </a>
      <div class="pop">
        <img src="./image/Screenshot_20221016_172950.jpg" alt="">
      </div>
    </li>
    <li>
      <a href="">
        <div class="icon">
          <Icon type="weixin" />
        </div>

        <span>
          {{data.weixin}}
        </span>
      </a>
      <div class="pop">
        <img src="./image/IMG_20221016_162052.png" alt="">
      </div>
    </li>
  </ul>
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
@import "~@/styles/var.less";

.contact-container {
  padding: 20px;
  margin: 0;
  list-style: none;
  color: @gray;
  @itemheight: 30px;

  a {
    display: flex;
    align-items: center;
    font-size: 14px;
    cursor: pointer;
  }

  li {
    position: relative;
    height: @itemheight;
    line-height: @itemheight;
    margin: 14px 0;

    &:hover {
      .pop {
        transform: scaleY(1);
      }
    }
  }

  .pop {
    position: absolute;
    padding: 10px 15px;
    background: #fff;
    left: 0;
    bottom: @itemheight + 5px; // 位置在一个li上面
    transform: scaleY(0); // 缩放
    transition: .5s;
    transform-origin: center bottom; // 变化中心

    img {
      width: 150px;
      height: 150px;
    }

    &::after {
      content: ""; // 设置伪类before或after一定要设的
      position: absolute; // 根据.pop定位
      width: 8px;
      height: 8px;
      background: #fff;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      bottom: -4px;
    }
  }

  
  .icon {
    font-size: 26px;
    width: 36px;
  }
}
</style>