<template>
  <div class="layout-section-container">
    <div class="layout-section-container__header">
      <div class="layout-section-container__header-head text_nowrap">
        <el-input
          v-if="inputVisible && showInput"
          size="default"
          ref="InputRef"
          v-model="inputValue"
          style="width: 300px;"
          :maxlength="30"
          placeholder="按下回车保存此次修改"
          @keyup.enter="handleInputConfirm"
        />
        <h1
          v-if="!inputVisible && showInput"
          :title="title"
          @click="showInput && route.path.indexOf('result') !== -1 && heihei ? setInputVisible(true) : () => {}"
          class="layout-section-container__header-title text_nowrap"
        >
          {{ title || '点击设置文章标题'}}
        </h1>
        <slot name="head"></slot>
      </div>
      <div class="layout-section-container__header-action">
        <slot name="action"></slot>
      </div>
    </div>
    <div class="layout-section-container__content">
      <div
        v-if="hasDivider"
        class="content-divider"
      ></div>
      <div
        class="layout-section-container__content-inner"
        :class="{
          'is-flex': flexContent
        }"
      >
        <slot name="default"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useState } from '@akar/vue-hooks'
import { useRoute } from 'vue-router'
import { title } from 'process'
/**
 * 上下布局，顶部 header 大标题 + 底部内容区域
 */
export default defineComponent({
  name: 'LayoutSection',
  props: {
    hasDivider: {
      type: Boolean,
      default: false
    },
    flexContent: {
      type: Boolean,
      default: false
    },
    getTitle: {
      type: Function,
      default: ()=>{}
    },
    title: {
      type: String,
      default: ''
    },
    changeTitle: {
      type: Function,
      default: ()=> {}
    },
    showInput: {
      type: Boolean,
      default: false
    },
    heihei: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const route = useRoute()
    // props传递proxy数据需要以实例的形式去传 getTitle返回proxy title
    const [inputValue] = useState(props.getTitle() || props.title)
    const [inputVisible, setInputVisible] = useState(false)
    const handleInputConfirm = (e) => {
      setInputVisible(false)
      props.changeTitle(inputValue.value)
    }
    return {
      inputVisible, setInputVisible, handleInputConfirm,
      inputValue, route
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-section-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  .layout-section-container__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    width: 100%;
    .layout-section-container__header-head {
      color: #303133;
      width: 100%;
      .layout-section-container__header-title {
        height: 18px;
        font-size: 18px;
        line-height: 18px;
        font-weight: 500;
      }
    }
    .layout-section-container__header-action {

    }
  }
  .layout-section-container__content {
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: 16px;
    flex: auto;
    .content-divider {
      height: calc(1px / 2);
      background: #dcdfe6;
      width: 99%;
      margin-left: .5%;
      margin-bottom: 6px;
    }
    .layout-section-container__content-inner {
      &.is-flex {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    }
  }
}
</style>
