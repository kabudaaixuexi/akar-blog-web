<template>
  <div
    class="go-back-container"
  >
    <a
      @click="router.back(-1)"
    >
      <IconFont
        icon="iconarrow_left"
        class="go-back-icon"
      />
      <h1 class="go-back-title">
        {{ title }}
      </h1>
    </a>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
defineProps<{ title: String }>();

const router = useRouter()
</script>
<style lang="scss" scoped>
.go-back-container {
  position: relative;
  height: 100%;
  white-space: nowrap;
  cursor: pointer;
  & > a {
    display: flex;
    align-items: center;
    height: 100%;
    color: #303133;
    .go-back-img {
      height: 32px;
    }
    .go-back-icon {
      color: #606266;
      font-size: 24px;
      padding-left: 8px;
    }
    .go-back-title {
      height: 22px;
      line-height: 22px;
      font-size: 16px;
      font-weight: 500;
      margin-left: 12px;
    }
  }
}
</style>
