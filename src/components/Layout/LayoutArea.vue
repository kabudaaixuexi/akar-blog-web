<template>
  <div class="layout-area-container">
    <div class="layout-area-container__top">
      <slot name="top"></slot>
    </div>
    <div class="layout-area-container__bottom">
      <div class="layout-area-container__bottom__inner">
        <!-- left aside -->
        <aside
          v-if="$slots.sideLeft"
          :style="`width: ${sideLeftWidth}px;min-width: ${sideLeftWidth}px`"
          class="side-layout-area-menu-bar-left"
        >
          <div class="layout-area-menu-bar__inner">
            <slot name="sideLeft"></slot>
          </div>
        </aside>
        <!-- content -->
        <section v-if="$slots.content" :class="`${$slots.sideRight ? 'content-section-container-a' : ($slots.sideLeft ? 'content-section-container-b' : 'content-section-container-c')}`" :style="`${contentWidth ? `width: ${contentWidth}px`: 'flex: auto'}; ${contentBottom ? `margin-bottom: ${contentBottom}px` : ''};`" id="content-section-container" class="content-section-container BgColor_Content">
          <main class="main-content-box">
            <div
              class="inner-content affix-container"
            >
              <slot name="content"></slot>
            </div>
          </main>
        </section>
        <!-- right aside -->
        <aside
          v-if="$slots.sideRight"
          id="side-layout-area-menu-bar-left"
          :style="`width: ${sideRightWidth}px;min-width: ${sideRightWidth}px`"
          class="side-layout-area-menu-bar-right"
        >
          <div class="layout-area-menu-bar__inner">
            <slot name="sideRight"></slot>
          </div>
        </aside>
      </div>
    </div>
    <Footer v-if="showFooter" />
    <Background mode="meteor" />
  </div>
</template>

<script lang="ts">
import Background from '@/components/Background/index.vue'
import { defineComponent } from 'vue'
/**
 * 上下左右布局，顶部导航 + (底部左侧侧边栏 + 底部右侧内容区域)
 */
export default defineComponent({
  name: 'LayoutArea',
  components: {
    Background
  },
  props: {
    showFooter: {
      type: Boolean,
      default: true
    },
    sideLeftWidth: {
      type: Number,
      default: 330
    },
    sideRightWidth: {
      type: Number,
      default: 316
    },
    contentWidth: {
      type: Number
    },
    contentBottom: {
      type: Number
    },
  }
})
</script>

<style lang="scss" scoped>
$headerHeight: 48px;
.layout-area-container {
  position: relative;
  display: flex;
  z-index: 1;
  flex-direction: column;
  min-width: 100%;
  margin-bottom: 52px;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
  background-image: var(--bgImage_Content);
  background-size: 100vw 100vh;
  transition: 1s;
  .layout-area-container__top {

  }
  .layout-area-container__bottom {
    display: flex;
    flex: 1;
    position: relative;
    color: #303133;
    .layout-area-container__bottom__inner {
      position: absolute;
      top: 1px;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      padding: 12px 12px 0 12px;
      // left
      .side-layout-area-menu-bar-left {
        position: relative;
        flex-direction: column;
        transition: width .28s;
        .layout-area-menu-bar__inner {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow-x: hidden;
          overflow-y: auto;
          padding: 0 12px;
          scroll-behavior: smooth;
        }
      }
      // right
      .side-layout-area-menu-bar-right {
        position: relative;
        flex-direction: column;
        transition: width .28s;
        .layout-area-menu-bar__inner {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow-x: hidden;
          overflow-y: auto;
          padding: 0 12px;
          scroll-behavior: smooth;
        }
      }
      // content
      .content-section-container {
        display: flex;
        max-width: 1010px;
        min-width: 800px;
        flex-direction: column;
        border-radius: 6px;
        .main-content-box {
          flex: auto;
          position: relative;
          .inner-content {
            padding: 24px 18px;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: auto;
            scroll-behavior: smooth;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .content-section-container-a {
    transform: translate(170px) scale(.5);
  }
  .content-section-container-b {
    transform: translate(-170px) scale(.5);
  }
  .content-section-container-c {
    transform: scale(.5);
  }
}
</style>
