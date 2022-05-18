<template>
  <LayoutSection flex-content :title="title" :showInput="true" :heihei="true" :changeTitle="changeTitle">
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
const route = useRoute();
// 生成富文本
let {
  vNode: value,
  lock,
  lockValue,
  subtitle,
  uid: watermark,
  noteid,
  published,
  cover,
  tags,
  drawe
} = Store.getState("myNoteList").find((el) => el.noteid == route.params.noteId) || {};
const [title, setTitle] = useState(subtitle);
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
const foundXsEditor = () => {
  foundEdit(
    document.querySelector("#xs-editor-note"),
    {
      value,
      operable: !lock,
      watermark,
      pattern: "classic", // silent | classic
      upFileUrl: "http://124.220.16.124:8099/upload/setFilesNote",
      onChange: (vm: Element, vn: any) => {
        editNote(vn);
      },
    },
    () => {
      // 额外要做的事
      // listenerDrag()
    }
  );
};
// 修改笔记实时保存
const editNote = async (ev: any) => {
  await Api.editNote({
    uid: userInfo.userName,
    noteid,
    subtitle: title.value,
    vNode: ev,
    lock,
    lockValue,
    published,
    cover,
    tags,
    drawe
  });
};
// 修改标题
const changeTitle = async (t) => {
  await Api.editNote({
    uid: userInfo.userName,
    noteid,
    subtitle: t,
    vNode: value,
    lockValue,
    lock,
    published,
    cover,
    tags,
    drawe
  });
  setTitle(t);
};
onMounted(() => {
  foundXsEditor();
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
  height: 100%;
  width: 100%;
  background: #000;
}
</style>
