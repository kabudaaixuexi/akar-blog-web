<template>
  <div class="common-select-tag-container">
    <figcaption @click="handleChange(item.value)" :class="`${(currentDrawe || 0) == item.value ? 'current': ''}`" v-for="(item, i) in draweOptions" :key="i">
      {{item.value == 0 ? '全部' : item.label}}
    </figcaption>
  </div>
</template>

<script setup lang="ts">
import { draweOptions } from '@/modules/Project/data'
const props = defineProps<{
  currentDrawe: 0,
  changeDrawe: (e) => {}
}>()

const handleChange = (e) => {
  props.changeDrawe(e)
}
</script>

<style lang="scss" scoped>
.common-select-tag-container {
  height: 66px;
  width: 100%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  margin-bottom: 24px;
  border-radius: 4px;

  display: flex;
  overflow-x: auto;
  flex-wrap: nowrap;
  figcaption {
    transition: all .2s;
    display: inline-block;
    height: 100%;
    line-height: 66px;
    padding: 0 24px;
    font-size: 13px;
    color: var(--xs-color-info-dark-2);
    cursor: pointer;
    &:hover {
      color: var(--xs-color-danger);
    }
  }
  .current {
      color: var(--xs-color-danger);
  }
}
</style>
