<template>
  <SearchSelect
    v-model="searchValue"
    :fetch="handleFetchSearch"
    placeholder="搜索文章"
    select-when-unmatched
    highlight-first-item
    v-bind="$attrs"
    @select="handleSelectSearch"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import SearchSelect from '@/components/SearchSelect/index.vue'
import {
  corporationList
} from '@/modules/Project/data'
export default defineComponent({
  name: 'SearchCorporation',
  components: {
    SearchSelect
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  emits: [
    'select'
  ],
  setup () {
    const searchValue = ref('')
    return {
      searchValue
    }
  },
  methods: {
    // 搜索笔记
    filterList (list: any, queryString: string) {
        const temList = JSON.parse(JSON.stringify(list))
        return temList.map((item: { content: any; vNode: any; value: string; subtitle: string; }) => {
            item.content = []
            const getValue = (children: { xs_value: any; children: any[]; }) => {
                if (children.xs_value) {
                    item.content.push(children.xs_value)
                }
                if (children.children) {
                   children.children.map(i => {
                        getValue(i)
                   })
                }
            }
            getValue(item.vNode)
            item.value = queryString
            const temB = item.content.join(',')
            const temC = item.content.filter((i: string | string[]) => {
                return i.indexOf(queryString) !== -1
            }).join(',')
            item.content = temC ? `<span>${temC.replace(queryString,`<spa style="color:red">${queryString}</spa>`)}</span>` : temB
            if (queryString && item.subtitle.indexOf(queryString) !== -1) {
                item.subtitle = `<spa>${item.subtitle.replace(queryString,`<spa style="color:red">${queryString}</spa>`)}</spa>`
            } else {
                item.subtitle = item.subtitle || '未设置标题'
            }
            return item
        }).filter((i: { content: string | string[]; subtitle: string | string[]; }) => i.content.indexOf('<spa') !== -1 || i.subtitle.indexOf('<spa>') !== -1)
    },
    async handleFetchSearch (query) {
      // const { error, data } = await this.$store.dispatch(ProjectModule.getAction('getSearchProjectByQuery'), query)

      // if (error) {
      //   return []
      // }

      // return data.projects.map(projectItem => {
      //   return {
      //     value: projectItem.corpName,
      //     label: projectItem.corpName
      //   }
      // })
      return this.filterList(this.list, query)
    },
    handleSelectSearch (name) {
      this.$emit('select', name)
    }
  }
})
</script>

<style>

</style>
