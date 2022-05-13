<template>
  <el-dropdown
    class="navigation-avatar"
    trigger="click"
  >
    <div style="padding: 0 12px;">
      <img
        src="@/assets/images/navigation-avatar.webp"
      >
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(cmdItem, index) in commandList"
          :key="index"
          @click="handleCommand(cmdItem)"
        >
          <div class="navigation-avatar__dropdown-command">
            <el-icon>
              <component :is="cmdItem.icon" />
            </el-icon>
            <span>{{ cmdItem.label }}</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import Cookie from 'js-cookie'
import { computed, defineComponent } from 'vue'
import Store from '@/store'
import { SwitchButton } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { log } from 'console'

export default defineComponent({
  name: 'NavigationAvatar',
  components: {
    SwitchButton
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const commandList = computed(() => [
      {
        label: '退出登录',
        icon: 'switch-button',
        click: () => {
          // Cookie.remove('token')
          console.log(Cookie.get('userInfo'));

          Cookie.remove('userInfo')
          Store.setState(null, 'userInfo')
          router.push({path: `/user`, replace:true})
        }
      }
    ])

    const handleCommand = (cmdItem) => {
      console.log('cmdItem', cmdItem)
      cmdItem?.click()
    }
    return {
      commandList,

      handleCommand
    }
  }
})
</script>
<style lang="scss">
.navigation-avatar {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  img {
    width: 24px;
    border: 1px solid $color-primary;
    border-radius: 50%;
  }
}
.navigation-avatar__dropdown-command {
  display: flex;
  align-items: center;
  user-select: none;
  white-space: nowrap;
}
</style>
