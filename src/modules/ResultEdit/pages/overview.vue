<template>
  <LayoutSection flex-content :title="title" :getTitle="getTitle" :showInput="true" :heihei="true" :changeTitle="changeTitle">
    <article id="xs-editor-note"></article>
  </LayoutSection>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import Cookies from "js-cookie";
import { onMounted } from "vue";
import Store from "@/store";
import Api from "@/api";
import foundEdit from "@akar/xs-editor";
import { useState } from "@akar/vue-hooks";
import { ElMessage } from "element-plus";
const route = useRoute();
const [noteInfo, setNoteInfo] = useState({})
const [title, setTitle] = useState('');
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
// 展示富文本
const themeMap = new Map([
  ['dark', 'silent'],
  ['light', 'classic'],
])
const foundXsEditor = (value, watermark, pattern = themeMap.get(Store.getState('theme') || 'light')) => {
  foundEdit(
    document.querySelector("#xs-editor-note"),
    {
      value,
      operable: true,
      watermark,
      pattern, // silent | classic
      upFileUrl: `${import.meta.env.VITE_BASE_API}/upload/setPackages?superior=_article`,
      onChange: (vm: Element, vn: any) => {
        editNote(vn);
      },
    },
    () => document.querySelector(".xs-editor-container").focus()
  );
};
// 修改笔记实时保存
const editNote = async (ev: any) => {
  await Api.editNote({
    ...noteInfo.value,
    vNode: ev,
    published: false
  });
};
// 修改标题
const changeTitle = async (t) => {
  await Api.editNote({
    ...noteInfo.value,
    subtitle: t,
    published: false
  });
  setTitle(t);
};
// props传递proxy数据需要以实例的形式去传
const getTitle = () => {
  return title
}
const handleTheme = () => {
  Store.watch('theme', (value) => {
    foundXsEditor(noteInfo.value.vNode, noteInfo.value.uid, value === 'dark' ? 'silent' : 'classic')
  })
}
onMounted(async () => {
  ElMessage.warning('编辑文章会自动保存，编辑完可重新发布')
  const { data } = await Api.getNoteListPublished({ type: 2, noteid: route.params.noteId });
  setTitle(data.subtitle)
  setNoteInfo(data)
  foundXsEditor(data.vNode, data.uid, Store.getState('theme') === 'dark' ? 'silent' : 'classic');
  handleTheme()
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
  background: #fff;
}
</style>
