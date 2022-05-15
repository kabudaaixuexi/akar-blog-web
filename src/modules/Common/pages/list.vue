<template>
  <LayoutArea :showFooter="false">
    <template #top>
      <NavigationNavBar :fixed="false">
        <NavigationSideLogo />
      </NavigationNavBar>
    </template>

    <template #content>
      <LayoutSection has-divider flex-content>
        <template #head>
          <CommonDrawes :list="list" :currentDrawe="currentDrawe" :changeDrawe="changeDrawe" />
          <SearchCorporation @select="handleSelectSearch" :list="list" :path="'resultDetail'" />
        </template>
        <!-- <CommonTableHeader /> -->
        <CommonTableBody :list="list" />
      </LayoutSection>
    </template>

    <template #side2>
      todo//-09
    </template>
  </LayoutArea>
</template>

<script lang="ts" setup>
import { defineComponent, ref, reactive, onMounted } from "vue";

import NavigationSideLogo from "@/components/Navigation/Side/SideLogo.vue";
import NavigationNavBar from "@/components/Navigation/NavBar.vue";

import CommonForm from "@/modules/Common/components/CommonForm.vue";
import CommonTableHeader from "@/modules/Common/components/TableHeader.vue";
import CommonTableBody from "@/modules/Common/components/TableBody.vue";
import CommonDrawes from '@/modules/Common/components/CommonDrawes.vue'

import SearchCorporation from "@/components/SearchSelect/SearchCorporation.vue";
import Api from "@/api";
import Cookies from "js-cookie";
import { useState } from "@/hooks/base";
import Store from '@/store'

const [list, setList] = useState([]);
const [currentDrawe, setCurrentDrawe] = useState(0)
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
// 获取文章列表
const getNoteListAll = async (drawe) => {
  const { data } = await Api.getNoteListAll({});
  if (Number(drawe)) {
    setList(data.filter(item => (item.drawe == drawe && !!item.published)));
  }else {
    Store.setState(JSON.parse(JSON.stringify(data)), "allNoteList");
    setList(data.filter(item => !!item.published));
  }
};
// 选择分类
const changeDrawe = (e) => {
  getNoteListAll(e)
  setCurrentDrawe(e)
}

function handleSelectSearch(name?: string) {
  console.log("搜索文章名: ", name);
}

onMounted(() => {
  getNoteListAll(undefined);
});
</script>

<style lang="scss" scoped>
.create-action {
  padding: 10px 20px;
  width: 100%;
  font-weight: 600;
}
</style>
