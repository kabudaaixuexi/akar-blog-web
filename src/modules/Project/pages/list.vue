<template>
  <LayoutArea>
    <template #top>
      <NavigationNavBar
        :fixed="false"
      >
        <NavigationSideLogo />
      </NavigationNavBar>
    </template>

    <template #side>
      <LayoutSection :title="'我的项目'">
        <el-button
          type="primary"
          class="create-action"
          @click="handleCreateProject()"
        >
          <IconFont
            style="margin-right: 8px"
            icon="iconestablish"
          />
          {{ '创建文章' }}
        </el-button>
      </LayoutSection>
    </template>

    <template #content>
      <LayoutSection
        has-divider
        flex-content
      >
        <template #head>
          <SearchCorporation
            @select="handleSelectSearch"
          />
        </template>

        <ProjectTableHeader />
        <ProjectTableBody />
      </LayoutSection>
    </template>
  </LayoutArea>
</template>

<script lang="ts">
import Store from '@/store'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  reactive
} from 'vue'

import NavigationSideLogo from '@/components/Navigation/Side/SideLogo.vue'
import NavigationNavBar from '@/components/Navigation/NavBar.vue'

import ProjectForm from '@/modules/Project/components/ProjectForm.vue'
import ProjectTableHeader from '@/modules/Project/components/TableHeader.vue'
import ProjectTableBody from '@/modules/Project/components/TableBody.vue'

import SearchCorporation from '@/components/SearchSelect/SearchCorporation.vue'
import { sleep } from '@/utils/request'
import useCurrentInstance from '@/hooks/useCurrentInstance'

export default defineComponent({
  name: 'ProjectList',
  components: {
    NavigationNavBar,
    NavigationSideLogo,
    ProjectTableHeader,
    ProjectTableBody,
    SearchCorporation
  },
  // https://github.com/vuejs/vue-next/issues/3649
  setup () {
    const { proxy } = useCurrentInstance()
    const store = Store.getState()

    function handleCreateProject () {
      const formData = reactive({
        title: '',
        tags: []
      })
      proxy.$ModalDialog({
        title: '新文章',
        top: '10vh',
        width: '50vw',
        'show-close': true,
        'close-on-click-modal': false,
        'close-on-press-escape': false,
        renderComponent: {
          data: formData,
          component: ProjectForm
        },
        async onConfirm (instance, context) {
          const isValid = await instance.validateRules()
          if (!isValid) return Promise.reject(new Error('error'))

          context.fullLoading = true
          // const { error, data } = await store.dispatch(
          //   ProjectModule.getAction('createProject'),
          //   formData
          // )

          // context.fullLoading = false

          // if (error) {
          //   return Promise.reject(new Error('error'))
          // }

          // store.dispatch(ProjectModule.getAction('getProjectList'))
        }
      })
    }
    function handleSelectSearch (name?: string) {
      console.log('搜索文章名: ', name)
    }
    handleSelectSearch()

    return {
      handleCreateProject,
      handleSelectSearch
    }
  }
})

</script>

<style lang="scss" scoped>
.create-action {
  padding: 10px 20px;
  width: 100%;
  font-weight: 600;
}
</style>
