<template>
  <article class="copyright-container BgColor_Content">
    <div class="copyright-container__index">
      <a class="link Color_Content" href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2022021650号-1</a>
    </div>
    <div class="copyright-container__aboutus">
      <a class="link Color_Content" href="">联系站长 「kaburda@163.com」</a>
    </div>

    <div class="copyright-container__wechat">
      <figure>
        <img class="" src="http://124.220.16.124:8099/files/packages/Akar/_section/WechatIMG129.jpeg" alt="">
        <!-- <figcaption>weChat</figcaption> -->
      </figure>
      <figure>
        <img class="" src="http://124.220.16.124:8099/files/packages/Akar/_section/gh_3fa57951f854_344.jpg" alt="">
        <!-- <figcaption>weChat</figcaption> -->
      </figure>
    </div>
    <div class="copyright-container__copyright Color_Content">
      <Octocat />
        版权所有 © 2020-PRESENT <a
          target="_blank"
          href="https://github.com/kabudaaixuexi"
          class="link"
        >
        nr
        </a>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import Cookie from "js-cookie";
import Api from "@/api";
import { useRouter } from 'vue-router'
import { useState } from "@akar/vue-hooks";
import { ElMessage } from "element-plus";
import Octocat from '@/components/Footer/octocat.vue'

const router = useRouter()
const userInfo = JSON.parse(Cookie.get("userInfo") || "{}");


onMounted(() => {
});
</script>

<style lang="scss" scoped>
.copyright-container {
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 6px;
  font-size: 13px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  box-shadow: 0 0 1px 0 var(--shadowColor_Content);
  &__aboutus {
    margin: 4px 0;
  }
  &__copyright {
    color: #555;
  }
  &__wechat {
    display: flex;
    margin: 12px 0;
    img {
      width: 80px;
      margin: 0 12px;
    }
    figure {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  &__copyright {
    display: flex;
    align-items: center;
  }
}
.link {
  transition: border .3s ease-in-out;
  margin-left: 6px;
  &:hover {
    border-color: #7d7d7d;
  }
}
</style>
