<template>
  <LayoutArea :showFooter="false" :sideLeftWidth="136">
    <template #top>
      <NavigationNavBar :fixed="false">
        <NavigationSideLogo />
        <div style="margin-left: 18px">
          <SearchCorporation @select="handleSelectSearch" :list="list" :path="'lett'"/>
        </div>
      </NavigationNavBar>
    </template>

    <template #sideLeft>
      <ul class="project-option">
        <li class="project-option-item" @click="handleCreateProject">
          <figcaption>
            <svg t="1653024126146" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14732" width="28" height="28"><path d="M853.333333 256H298.666667c-23.466667 0-42.666667 19.2-42.666667 42.666667v554.666666c0 23.466667 19.2 42.666667 42.666667 42.666667h554.666666c23.466667 0 42.666667-19.2 42.666667-42.666667V298.666667c0-23.466667-19.2-42.666667-42.666667-42.666667z m-106.666666 362.666667h-128v128h-85.333334v-128h-128v-85.333334h128v-128h85.333334v128h128v85.333334z" p-id="14733"></path><path d="M170.666667 170.666667h512v42.666666h42.666666V170.666667c0-23.466667-19.2-42.666667-42.666666-42.666667H170.666667c-23.466667 0-42.666667 19.2-42.666667 42.666667v512c0 23.466667 19.2 42.666667 42.666667 42.666666h42.666666v-42.666666H170.666667V170.666667z" p-id="14734"></path></svg>
          </figcaption>
          <span>新建文章</span>
        </li>
      </ul>
    </template>

    <template #content>
      <LayoutSection has-divider flex-content>
        <template #head>
          <ProjectTableHeader />
        </template>
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
import useCurrentInstance from "@/hooks/useCurrentInstance";
import { useState } from "@akar/vue-hooks";
import { creatEmptyVNode } from '../data'
import Cookies from "js-cookie";
import Api from "@/api";


const { proxy } = useCurrentInstance();
const [list, setList] = useState([]);
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");

// 获取文章列表
const getNoteList = async () => {
  const { data } = await Api.getNoteList({
    uid: userInfo.uid,
  });
  setList(data);
};

function handleCreateProject() {
  const formData = reactive({
    title: "",
    tags: [],
    drawe: 0,
    cover: "",
    editorType: 'ckeditor'
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
      const { title: subtitle, cover, tags, drawe, editorType } = formData;
      // 新增笔记
      await Api.addNote({
        uid: userInfo.uid,
        userName: userInfo.userName,
        userPortrait: userInfo.userPortrait,
        vNode: creatEmptyVNode(),
        subtitle,
        lockValue: "",
        lock: false,
        cover,
        tags,
        drawe,
        editorType
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
.project-option {
  display: flex;
  height: 60%;
  padding-right: 12px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #000;
  border-radius: 12px;
  .project-option-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: var(--xs-color-primary-light-7);
    white-space: nowrap;
    overflow: hidden;
    transition: all .22s;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 500;
    box-shadow: 0 1px 4px rgba(0,21,41,.18);
    span {
      transition: all .3s;
      margin-left: 36px;
    }
    figcaption {
      transition: all .3s;
      margin-left: 14px;
    }
    &:hover {
      figcaption {
        margin-left: -36px;
      }
      border-radius: 10px;
      width: 108px;
      padding-right: 50px;
      background-color: var(--xs-color-warning-light-5);
    }
  }
}
</style>
