<template>
  <LayoutArea :showFooter="false">
    <template #top>
      <NavigationNavBar :fixed="false">
        <NavigationSideGoBack :title="'返回'" />
      </NavigationNavBar>
    </template>
    <template v-if="noteInfo.editorType !== 'xseditor'" #sideLeft>
      <ul class="project-option">
        <li class="project-option-item save" @click="handleSave">
          <figcaption>
            <svg
              t="1682511082493"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2247"
              width="28"
              height="28"
            >
              <path
                d="M146.012 911.472c-41.495 0-74.012-32.499-74.012-73.993V567.582c0-16.477 20.766-58.282 60.983-64.45l0.62-316.611c0-40.108 33.831-73.993 73.866-73.993h609.026c40.728 0 73.902 33.192 73.902 73.993v315.881c37.845 6.24 61.603 46.148 61.603 65.18V837.48c0 35.582-28.32 73.993-74.012 73.993H146.012z m5.729-75.818l717.926 0.748 0.73-46.056V577.855l-164.117-0.748-0.73 46.056c0 35.893-31.933 65.107-71.201 65.107H388.337c-39.268 0-71.201-29.214-71.201-65.107v-45.308l-165.285-0.748-0.11 258.547z m62.151-334.365l64.377 0.602c16.313 0 32.991 0.036 46.458 0.146 50.217 0.42 73.61 44.651 73.61 74.413v36.44l226.159 0.748 0.73-37.188c0-30.418 26.787-74.413 75.143-74.413h108.536l0.328-314.549-594.61-0.748-0.731 314.549z"
                fill="#333333"
                p-id="2248"
              ></path>
            </svg>
          </figcaption>
          <span>保存草稿</span>
        </li>
        <li class="project-option-item commit" @click="handleCommit">
          <figcaption>
            <svg
              t="1682511152021"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5079"
              width="28"
              height="28"
            >
              <path
                d="M638.24 959.78c-20.29 0-40.18-7.11-56.23-20.57L453.84 831.47 316.06 941.39c-13.51 10.8-32.05 12.81-47.55 5.25-15.52-7.59-25.32-23.41-25.14-40.71l2.51-244.39L127.07 556.8c-21.69-18.21-33.16-46.92-29.91-76.1 3.26-29.21 20.79-54.65 46.89-68.12L800.74 74.06c31.13-16.05 67.38-12.25 94.53 9.84 27.17 22.12 38.21 56.84 28.81 90.59L722.76 895.7c-8.05 28.81-29.93 51.29-58.5 60.12-8.57 2.65-17.34 3.96-26.02 3.96zM454.58 728.83c10.25 0 20.48 3.5 28.81 10.49L637.33 868.7l198.79-712.13-648.47 334.27 132.81 117.07c9.77 8.59 15.3 21.03 15.17 34.04l-1.75 170.68 92.78-74.02a44.674 44.674 0 0 1 27.92-9.78z"
                fill="#333333"
                p-id="5080"
              ></path>
              <path
                d="M460.42 594.64c-11.46 0-22.91-4.37-31.66-13.12-17.49-17.49-17.49-45.84 0-63.31l167.53-167.48c17.49-17.49 45.82-17.49 63.31 0s17.49 45.84 0 63.31L492.07 581.52c-8.74 8.75-20.2 13.12-31.65 13.12z"
                fill="#333333"
                p-id="5081"
              ></path>
            </svg>
          </figcaption>
          <span>发布文章</span>
        </li>
      </ul>
    </template>
    <template #content>
      <el-input
        v-if="inputVisible"
        v-model="noteInfo.subtitle"
        style="width: 100%; margin-bottom: 20px;"
        :maxlength="50"
        placeholder="按下回车保存此次修改"
        @keyup.enter="changeTitle"
      />
      <h1
        v-if="!inputVisible"
        @click="() => setInputVisible(true)"
        class="layout-section-container__header-title text_nowrap Color_Content"
      >
        {{ noteInfo.subtitle || "点击设置文章标题" }}
      </h1>
      <br />
      <article v-if="noteInfo.editorType === 'xseditor'" id="xs-editor-note"></article>
      <article v-else id="ck-editor-note"></article>
    </template>
  </LayoutArea>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import Api from "@/api";
import createXsEditor, { createDom, createVdom } from "@akar/xs-editor";
import { UploadAdapter } from "../data";
import { useState } from "@akar/vue-hooks";
import { ElMessage } from "element-plus";
import NavigationSideGoBack from "@/components/Navigation/Side/SideGoBack.vue";
import NavigationNavBar from "@/components/Navigation/NavBar.vue";
let ckEditor: any = null;
const route = useRoute(), router = useRouter()
const [noteInfo, setNoteInfo] = useState({});
const [inputVisible, setInputVisible] = useState(false);

// 加载xsEditor
const foundXsEditor = (value, watermark) => {
  createXsEditor(
    document.querySelector("#xs-editor-note"),
    {
      value,
      operable: true,
      watermark,
      pattern: "classic",
      upFileUrl: `${import.meta.env.VITE_BASE_API}/upload/setPackages?superior=_article`,
      onChange: (vm: Element, vn: any) => {
        changeSave(vn);
      },
    },
    () => document.querySelector(".xs-editor-container").focus()
  );
};

// 加载CkEditor
const foundCkEditor = () => {
  (window as any).ClassicEditor.create(document.getElementById("ck-editor-note")).then(
    (_editor: any) => {
      _editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
        return new UploadAdapter(loader);
      };
      ckEditor = _editor;
      _editor.data.set(createDom(noteInfo.value.vNode).innerHTML);
    }
  );
};

// 保存草稿
const handleSave = async () => {
  const template = document.createElement("div");
  template.innerHTML = ckEditor.data.get();
  await Api.editNote({
    ...noteInfo.value,
    vNode: createVdom(template),
    published: false,
  });
  ElMessage.success("保存草稿成功");
};

// 保存并发布
const handleCommit = async () => {
  const template = document.createElement("div");
  template.innerHTML = ckEditor.data.get();
  if (!ckEditor.data.get()) {
    return ElMessage.error('不能发布空文章哦～')
  }
  await Api.editNote({
    ...noteInfo.value,
    vNode: createVdom(template),
    published: true,
  });
  ElMessage.success("发布成功");
  router.push('/k2rp')
};

// 修改笔记实时保存
const changeSave = async (ev: any) => {
  await Api.editNote({
    ...noteInfo.value,
    vNode: ev,
    published: false,
  });
};
// 修改标题
const changeTitle = async (t) => {
  await Api.editNote({
    ...noteInfo.value,
    published: false,
  });
  setInputVisible(false);
};

onMounted(async () => {
  const { data } = await Api.getNoteListPublished({ type: 2, noteid: route.params.noteId });
  setNoteInfo(data);
  data.editorType === "xseditor"
    ? setTimeout(() => {
        foundXsEditor(data.vNode, data.uid);
        ElMessage.warning("编辑文章会自动保存，编辑完可重新发布");
      })
    : foundCkEditor();
});
</script>

<style lang="scss" scoped>
.wrap-result-overview-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 360px) 528px;
  grid-gap: 16px;
  padding-bottom: 16px;
  .grid-last {
    grid-column-start: span 2;
  }
  .fitting-operate {
    color: $color-primary;
    cursor: pointer;
  }
}
#xs-editor-note {
  border: none;
  outline: none;
  flex: 1;
  z-index: 1;
  max-height: calc(100vh - 120px);
  width: 100%;
  height: 100%;
  background: #fff;
}
.project-option {
  display: flex;
  height: 60%;
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
    white-space: nowrap;
    overflow: hidden;
    transition: all 0.22s;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    font-weight: 500;
    box-shadow: 1px 4px 10px rgba(37, 52, 65, 0.18);
    margin-bottom: 30px;
    span {
      transition: all 0.3s;
      margin-left: 36px;
    }
    figcaption {
      transition: all 0.3s;
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
  .save {
    background-color: var(--el-color-primary-light-8);
  }
  .commit {
    background-color: var(--el-color-success-light-8);
  }
  .more {
    background-color: var(--el-color-warning-light-8);
  }
}
</style>
