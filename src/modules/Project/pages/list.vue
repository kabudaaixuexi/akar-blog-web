<template>
  <LayoutArea :showFooter="false">
    <template #top>
      <NavigationNavBar :fixed="false">
        <NavigationSideLogo />
      </NavigationNavBar>
    </template>

    <template #side>
      <LayoutSection :title="'我的文章'" :showInput="true">
        <el-button type="primary" class="create-action" @click="handleCreateProject()">
          <IconFont style="margin-right: 8px" icon="iconestablish" />
          {{ "创建文章" }}
        </el-button>
      </LayoutSection>
    </template>

    <template #content>
      <LayoutSection has-divider flex-content>
        <template #head>
          <SearchCorporation @select="handleSelectSearch" :list="list" :path="'resultEdit'"/>
        </template>

        <ProjectTableHeader />
        <ProjectTableBody :list="list" />
      </LayoutSection>
    </template>
  </LayoutArea>
</template>

<script lang="ts" setup>
import { defineComponent, ref, reactive, onMounted } from "vue";

import NavigationSideLogo from "@/components/Navigation/Side/SideLogo.vue";
import NavigationNavBar from "@/components/Navigation/NavBar.vue";

import ProjectForm from "@/modules/Project/components/ProjectForm.vue";
import ProjectTableHeader from "@/modules/Project/components/TableHeader.vue";
import ProjectTableBody from "@/modules/Project/components/TableBody.vue";

import SearchCorporation from "@/components/SearchSelect/SearchCorporation.vue";
import Api from "@/api";
import useCurrentInstance from "@/hooks/useCurrentInstance";
import Cookies from "js-cookie";
import { useState } from "@/hooks/base";
import Store from "@/store";
import { creatEmptyVNode } from '../data'

const { proxy } = useCurrentInstance();
const [list, setList] = useState([]);
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
// 获取文章列表
const getNoteList = async () => {
  const { data } = await Api.getNoteList({
    uid: userInfo.userName,
  });
  Store.setState(data, "myNoteList");
  setList(data);
};

function handleCreateProject() {
  const formData = reactive({
    title: "",
    tags: [],
    drawe: 0,
    cover: "",
  });
  proxy.$ModalDialog({
    title: "新文章",
    top: "10vh",
    width: "50vw",
    "show-close": true,
    "close-on-click-modal": false,
    "close-on-press-escape": false,
    renderComponent: {
      data: formData,
      component: ProjectForm,
    },
    async onConfirm(instance, context) {
      const isValid = await instance.validateRules();
      if (!isValid) return Promise.reject(new Error("error"));
      const { title: subtitle, cover, tags, drawe } = formData;
      // 新增笔记
      await Api.addNote({
        uid: userInfo.userName,
        vNode: creatEmptyVNode(),
        subtitle,
        lockValue: "",
        lock: false,
        cover,
        tags,
        drawe
      });
      context.fullLoading = true;
      getNoteList();
    },
  });
}
function handleSelectSearch(name?: string) {
  console.log("搜索文章名: ", name);
}

onMounted(() => {
  getNoteList();
});
</script>

<style lang="scss" scoped>
.create-action {
  padding: 10px 20px;
  width: 100%;
  font-weight: 600;
}
</style>
