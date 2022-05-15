<template>
   <LayoutArea :showFooter="false">
    <template #top>
      <NavigationNavBar :fixed="false">
       <NavigationSideGoBack
          :title="'返回'"
        />
      </NavigationNavBar>
    </template>

    <template #content>
      <header class="result-detail-header">
        <div class="result-detail-header__title">{{ subtitle }}</div>
        <div class="result-detail-header__detail">
          <p>
            <span style="padding-right: 24px"><span style="color:#000;padding-right: 6px">{{watermark}}</span> 于 {{latestTime}} 发布</span>
            <span>👍 32</span>
          </p>
          <p>
            <span style="padding-right: 12px">分类专栏：{{draweOptions.find(i => i.value == drawe)?.label || '全部'}}</span>
            <span>文章标签： <el-tag v-for="(item, index) in (drawe || [])" :key="index">{{item}}</el-tag></span>
          </p>
        </div>
        <div class="result-detail-header__options">

        </div>
      </header>
      <article id="xs-editor-note"></article>
    </template>

    <template #side2>
      <div class="card result-detail-card-author">
        <p>userinfo</p>
      </div>
      <div class="card result-detail-card-recommend">
        <p>recommend</p>
      </div>
      <div class="card result-detail-card-more">
        <p>other</p>
      </div>
    </template>
  </LayoutArea>
</template>

<script lang="ts" setup>
import NavigationSideGoBack from '@/components/Navigation/Side/SideGoBack.vue'
import NavigationNavBar from "@/components/Navigation/NavBar.vue";
import { useRoute } from "vue-router";
import Cookies from "js-cookie";
import { onMounted } from "vue";
import Store from "@/store";
import Api from "@/api";
import foundEdit from "@akar/xs-editor";
import { useState } from "@/hooks/base";
import { draweOptions } from '@/modules/Project/data'
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
  latestTime,
  drawe
} = Store.getState("allNoteList").find((el) => el.noteid == route.params.noteId) || {};
const [title, setTitle] = useState(subtitle);
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
const foundXsEditor = () => {
  foundEdit(
    document.querySelector("#xs-editor-note"),
    {
      value,
      operable: false,
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

.result-detail-header {
  background: #fff;
  width: 100%;
  padding-bottom: 12px;
  &__title {
    font-size: 36px;
    padding: 12px 0;
    font-weight: 600;
    transform: scale(.96);
  }
  &__detail {
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    background: var(--xs-color-info-light-9);
    padding: 6px 12px;
    margin: 6px 0;
    border-radius: 2px;
    font-size: 12px;
    transform: scale(.96);
  }
  &__options {
    border: calc(1px / 2) solid var(--xs-color-info-light-9);
    margin-top: 12px;
    height: 36px;
    width: 100%;
    transform: scale(.96);
  }
}
.card {
  background: #fff;
  width: 100%;
  height: max-content;
  min-height: 100px;
  margin-bottom: 12px;
  padding: 12px;
}
.result-detail-card-author {

}
</style>
