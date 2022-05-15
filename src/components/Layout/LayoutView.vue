<template>
  <LayoutArea>
    <template #top>
      <NavigationNavBar
        :fixed="false"
      >
        <NavigationSideGoBack
          :title="'返回'"
        />
      </NavigationNavBar>
    </template>
    <template #side>
      <LayoutSection
        has-divider
        :title="'todo//07'"
        :showInput="true"
      >
        <ul>
          <li>give me some advice</li>
          <li></li>
          <li></li>
        </ul>
      </LayoutSection>
    </template>
    <template #content>
      <router-view />
    </template>
  </LayoutArea>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationSideGoBack from '@/components/Navigation/Side/SideGoBack.vue'
import NavigationNavBar from '@/components/Navigation/NavBar.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LayoutView',
  components: {
    NavigationNavBar,
    NavigationSideGoBack
  },
  setup () {
    const router = useRouter()

    return {
    }
  }
})

</script>

<style lang="scss" scoped>
</style>
