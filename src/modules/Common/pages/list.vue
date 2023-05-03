<template>
  <LayoutArea :showFooter="false">

    <template #top>
      <NavigationNavBar :fixed="false">
        <NavigationSideLogo />
        <div style="margin-left: 18px">
          <SearchCorporation @select="handleSelectSearch" :list="list" :path="'e98f'" />
        </div>
      </NavigationNavBar>
    </template>

    <template #sideLeft>
    </template>

    <template #content>
      <Rotation pop="16-9" />
      <LayoutSection has-divider flex-content>
        <template #head>
          <CommonDrawes :list="list" :currentDrawe="currentDrawe" :changeDrawe="changeDrawe" />
        </template>
        <CommonTableBody :list="list" />
      </LayoutSection>
    </template>

    <template #sideRight>
      <BlogRanking :type="6" />
      <BlogRanking :type="9" />
      <UserSuggest />
      <Copyright />
    </template>

  </LayoutArea>
</template>

<script lang="ts" setup>
import { defineComponent, ref, reactive, onMounted } from "vue";
import Rotation from "@/components/Rotation/index.vue";
import Copyright from "@/components/Plates/Copyright.vue";
import BlogRanking from "@/components/Plates/BlogRanking.vue";
import UserSuggest from "@/components/Plates/UserSuggest.vue";
import NavigationSideLogo from "@/components/Navigation/Side/SideLogo.vue";
import NavigationNavBar from "@/components/Navigation/NavBar.vue";

import CommonTableBody from "@/modules/Common/components/TableBody.vue";
import CommonDrawes from "@/modules/Common/components/CommonDrawes.vue";

import SearchCorporation from "@/components/SearchSelect/SearchCorporation.vue";
import Api from "@/api";
import { useState } from "@akar/vue-hooks";

const [list, setList] = useState(false);
const [currentDrawe, setCurrentDrawe] = useState(0);

// 获取文章列表
const getNoteList = async (drawe) => {
  if (Number(drawe)) {
    const { data } = await Api.getNoteListPublished({ type: 1, drawe });
    setList(data);
  } else {
    const { data } = await Api.getNoteListPublished({});
    setList(data);
  }
};
// 选择分类
const changeDrawe = (e) => {
  getNoteList(e);
  setCurrentDrawe(e);
};

function handleSelectSearch(name?: string) {
  console.log("搜索文章名: ", name);
}

onMounted(async () => {
  getNoteList(undefined);
});
</script>

<style lang="scss" scoped>
.create-action {
  padding: 10px 20px;
  width: 100%;
  font-weight: 600;
}
</style>
