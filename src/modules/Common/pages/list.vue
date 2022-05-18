<template>
  <LayoutArea :showFooter="false">
    <template #top>
      <NavigationNavBar :fixed="false">
        <NavigationSideLogo />
      </NavigationNavBar>
    </template>
    <template #side>
      <div class="card">
        <p>todo//-01</p>
      </div>
      <div class="card">
        <p>todo//-02</p>
      </div>
      <div class="card">
        <p>todo//-03</p>
      </div>
      <div class="card">
        <p>todo//-04</p>
      </div>
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
      <div class="card">
        <p>todo//-09</p>
      </div>
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
import { useState } from "@akar/vue-hooks";
import Store from '@/store'

const [list, setList] = useState([]);
const [currentDrawe, setCurrentDrawe] = useState(0)
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
// 获取文章列表
const getNoteList = async (drawe) => {
  if (Number(drawe)) {
    const { data } = await Api.getNoteListPublished({type: 1, drawe })
    setList(data);
  }else {
    const { data } = await Api.getNoteListPublished({})
    setList(data)
  }
};
// 选择分类
const changeDrawe = (e) => {
  getNoteList(e)
  setCurrentDrawe(e)
}

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
.card {
  background: #fff;
  width: 100%;
  height: max-content;
  min-height: 200px;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 6px;
  box-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.1);
}
</style>
