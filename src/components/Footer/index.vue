<template>
  <footer
    class="footer"
    :class="{
      'border': showBorder
    }"
  >
    <article
      class="container"
    >
      <div
        class="copyright"
      >
        <Octocat />
        Copyright © 2020-PRESENT <a
          target="_blank"
          :href="link"
          class="link"
        >
          「 kaburda@163.com 」
        </a>
      </div>
      <div class="filings">
        <a class="link" href="https://beian.miit.gov.cn/" target="_blank">豫ICP备2022021650号-1</a>
      </div>
    </article>
  </footer>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import Octocat from './octocat.vue'

export default defineComponent({
  name: 'Footer',
  components: {
    Octocat
  },
  props: {
    showBorder: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const link = ref('https://github.com/kabudaaixuexi')
    return {
      link
    }
  }
})
</script>
<style lang="scss" scoped>
.footer {
  margin: 0 auto;
  width: 100%;
  background: #fff;
  &.border {
    border-top: 1px solid rgba(#3c3c43, .12);
  }
  .container {
    padding: 14px 0 14px;
    display: flex;
    justify-content: center;
    .copyright, .filings {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      text-align: center;
      line-height: 1;
      font-size: 1rem;
      color: #929292;
    }
  }
}
.link {
  color: #555;
  transition: border .3s ease-in-out;
  margin-left: 6px;
  &:hover {
    border-color: #7d7d7d;
  }
}
</style>
