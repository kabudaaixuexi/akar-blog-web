<template>
  <ul class="project-table-header-container">
    <li
      v-for="(headItem, index) in list"
      :key="index"
      :style="getHeadItem(headItem)"
      class="project-table-header-container__head-item"
    >
      {{ headItem.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'ProjectTableHeader',
  setup () {
    const list = computed(() => [
      {
        name: '文章'
      },
      {
        name: '创建时间',
        width: '18%'
      },
      {
        name: '操作',
        width: '19%'
      }
    ])

    function getHeadItem (head) {
      return {
        width: head.width,
        flex: head.width
          ? 'initial'
          : 1
      }
    }
    return {
      list,
      getHeadItem
    }
  }
})
</script>

<style lang="scss" scoped>
.project-table-header-container {
  display: flex;
  padding: 10px 24px;
  font-weight: 400;
  line-height: 20px;
  color: #909399;
  .project-table-header-container__head-item {
  }
}
</style>
