<template>
  <div>
    <header
      class="navigation-navbar-header-container"
      :class="{
        'fixed-header': fixed
      }"
    >
      <div class="navbar-header-box BgColor_Header">
        <slot></slot>
        <div style="flex: 1;"></div>
        <NavigationSideAction />
        <NavigationAvatar />
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationSideAction from '@/components/Navigation/Side/SideAction.vue'
import NavigationAvatar from '@/components/Navigation/Avatar.vue'

export default defineComponent({
  name: 'NavigationNavBar',
  components: {
    NavigationSideAction,
    NavigationAvatar
  },
  props: {
    fixed: {
      type: Boolean,
      default: true
    }
  }
})
</script>
<style lang="scss" scoped>
$headerHeight: 48px;
.navigation-navbar-header-container {
  height: $headerHeight;
  line-height: $headerHeight;
  &.fixed-header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 3;
  }
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .navbar-header-box {
    display: flex;
    height: 100%;
    padding: 0 10px;
  }
}
</style>
