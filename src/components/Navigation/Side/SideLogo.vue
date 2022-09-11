<template>
  <div
    class="side-logo-container"
  >
    <router-link
      :to="`/k2rp`"
    >
      <img
        class="side-logo-img"
        src="@/assets/images/logo-akar.svg"
        alt="Akar"
      >
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
    color: #303133;
    .side-logo-img {
      width: 40px;
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
