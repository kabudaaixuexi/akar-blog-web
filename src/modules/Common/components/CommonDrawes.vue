<template>
  <div  class="common-select-tag-container Color_Content">
    <figcaption @click="handleChange(item.value)" :class="`${(currentDrawe || 0) == item.value ? 'current': ''}`" v-for="(item, i) in draweOptions" :key="i">
      {{item.value == 0 ? '全部' : item.label}}
    </figcaption>
  </div>
</template>

<script setup lang="ts">
import Store from "@/store"
const props = defineProps<{
  currentDrawe: 0,
  changeDrawe: (e) => {}
}>()
const draweOptions = Store.getState('noteClassify')
const handleChange = (e) => {
  props.changeDrawe(e)
}
</script>

<style lang="scss" scoped>
.common-select-tag-container {
  height: 48px;
  width: 100%;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  display: flex;
  overflow-x: auto;
  flex-wrap: nowrap;
  figcaption {
    transition: all .2s;
    display: inline-block;
    height: 100%;
    line-height: 48px;
    padding: 0 24px;
    font-size: 12px;
    font-weight: 500;
    font-family: 'Courier New', Courier, monospace;
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
