<template>
  <div class="project-table-body-container">
    <div class="project-table-body-container__inner">
      <ProjectItem
        v-for="(item, index) in list"
        :key="index"
        :dataset="item"
        :list="list"
      />
      <div
        v-if="!list || !list.length"
        class="project-empty-box"
      >
        <img
          src="@/assets/images/project-empty.svg"
          alt="Empty"
        >
        <span>{{ '空空如也～' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectItem from '@/modules/Project/components/ProjectItem.vue'
defineProps<{ list: any}>();

</script>

<style lang="scss" scoped>
.project-table-body-container {
  position: relative;
  flex: auto;
  .project-table-body-container__inner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 10px 6px 0;
    scroll-behavior: smooth;
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    .project-empty-box {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-top: 171px;
      & > img {
        width: 140px;
      }
      & > span {
        font-size: 12px;
        font-family:serif;
        line-height: 14px;
        color: #606266;
      }
    }
  }
}
</style>
