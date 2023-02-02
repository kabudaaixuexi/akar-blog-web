<template>
  <div
    class="side-logo-container"
  >
    <router-link
      :to="`/k2rp`"
    >
      <!-- <img
        class="side-logo-img"
        src="@/assets/images/logo-akar.svg"
        alt="Akar"
      > -->
      <div class="side-logo-img" />
      <h1 class="side-logo-title">
        {{ title }}
      </h1>
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'NavigationSideLogo',
  props: {
    title: {
      type: String,
      default: '勤能补拙'
    }
  },
  setup () {
    return {
    }
  }
})
</script>
<style lang="scss" scoped>
.side-logo-container {
  position: relative;
  height: 100%;
  white-space: nowrap;
  & > a {
    display: flex;
    align-items: center;
    height: 100%;
    color: var(--color_Header);
    transition: all 1s;
    .side-logo-img {
      width: 40px;
      height: 40px;
      background-image: var(--iconImage_Header);
      background-size: 100% 100%;
      border-radius: 50%;
      background-color: #fff;
      box-shadow:0 0 4px 2px var(--bgColor_Header) inset;
      transition: 1s;
    }
    .side-logo-title {
      height: 32px;
      line-height: 32px;
      font-size: 14px;
      font-family: serif;
      font-weight: 600;
      margin-left: 12px;
    }
  }
}
</style>
