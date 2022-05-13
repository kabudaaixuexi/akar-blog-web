<template>
  <el-config-provider
    :test="111"
  >
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import { ElConfigProvider } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import Store from './store'

export default {
  name: 'App',
  components: {
    ElConfigProvider
  },
  setup () {
    const state: any = reactive({
    });
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss">
@use '@/styles/index.scss';
</style>
