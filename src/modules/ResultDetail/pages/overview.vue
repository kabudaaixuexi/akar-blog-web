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
        <div class="result-detail-header__title">{{ subtitle || '作者未设置文章标题' }}</div>
        <div class="result-detail-header__detail">
          <p>
            <span style="padding-right: 24px"><span style="color:#000;padding-right: 12px">{{watermark}}</span>
              <span ><el-icon color="var(--xs-color-primary)" :size="16"><Clock /></el-icon></span>
              <span style="padding-left: 6px;color: var(--xs-color-info)">于 {{latestTime}} 发布</span>
              <span style="padding-left: 12px"><el-icon color="var(--xs-color-primary)" :size="16"><ChatLineSquare /></el-icon></span>
              <span style="padding-left: 6px;color: var(--xs-color-info)">已有 {{extData.eval?.length || 0}} 条评论</span>
            </span>
            <span></span>
          </p>
          <!-- <p style="color: var(--xs-color-info)">
            <span style="padding-right: 12px">文章分类：
              <span class="my-tag">{{draweOptions.find(i => i.value == drawe)?.label || '全部'}}</span>
            </span>
            <span>文章标签： <el-tag v-for="(item, index) in (drawe || [])" :key="index">{{item}}</el-tag></span>
          </p> -->
        </div>
        <div class="result-detail-header__options">

        </div>
      </header>
      <article id="xs-editor-note"></article>
      <footer class="result-detail-footer">
          <div class="result-detail-footer__left">
            <img v-if="user.photo" :src="user.photo" />
            <img v-else src="@/assets/images/navigation-avatar.webp" />
            <b>{{watermark}}</b>
          </div>
          <figure class="result-detail-footer__right">
            <TooltipCustom :content="!!stars.length ? `${stars[0]} 在内的 ${stars.length} 位用户觉得很赞！` : '为文章点上第一个赞吧～'">
                <div @click="changeStar"><el-icon :size="16" :color="stars.includes(userInfo.userName) ? '#FA5555' : ''"><Star /></el-icon><span :style="`padding-left: 6px;color: ${stars.includes(userInfo.userName) ? '#FA5555' : ''}`">{{stars.length || 0}}</span></div>
            </TooltipCustom>
            <TooltipCustom :content="`评论功能暂时还未开发～`">
                <div><el-icon :size="16"><ChatLineSquare /></el-icon> <span style="padding-left: 6px">{{extData.eval?.length || 0}}</span></div>
            </TooltipCustom>
            <div class="my-tag">{{ draweOptions.find(i => i.value == drawe)?.label || '专栏目录' }}</div>
          </figure>
      </footer>
    </template>

    <template #side2>
      <div class="card result-detail-card-author">
        <p>todo//-017</p>
      </div>
      <div class="card result-detail-card-recommend">
        <p>todo//-018</p>
      </div>
      <div class="card result-detail-card-more">
        <p>todo//-019</p>
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
import { getNotes } from '@/store/dispatch'
import Api from "@/api";
import foundEdit from "@akar/xs-editor";
import { useState } from "@/hooks/base";
import { draweOptions } from '@/modules/Project/data'
import { Star, ChatLineSquare, Present, Clock } from "@element-plus/icons-vue";
const route = useRoute();
// 生成富文本
const noteInfo = getNotes({type: 0, payload: { noteid: route.params.noteId}})
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
  drawe,
  extData = {}
} = noteInfo
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
const [user, setUser] = useState({})
// 点赞评论
const [stars, setStars] = useState(extData.star || [])
const changeStar = async () => {
  console.log(stars.value.includes(userInfo.userName));
  let temExtData
  if (!stars.value.includes(userInfo.userName)) {
    temExtData = {
        ...extData,
        star: [ ...stars.value, userInfo.userName]
    }
  } else {
    temExtData = {
        ...extData,
        star: stars.value.filter(i => i != userInfo.userName)
    }
  }

  await Api.editNote({
      ...noteInfo,
      extData: temExtData
  })
  setStars(temExtData.star)
}
const changeEval = async (val) => {
    await Api.editNote({
      ...noteInfo,
      extData: {
        ...extData,
        eval: [ ...extData?.eval, {
          uid: userInfo.userName,
          value: val
        }]
      }
    })
}
// 展示富文本
const foundXsEditor = () => {
  foundEdit(
    document.querySelector("#xs-editor-note"),
    {
      value,
      operable: false,
      watermark,
      pattern: "classic", // silent | classic
    },() => {}
  );
};
// 获取用户列表
const getUserList = async () => {
  const { data } = await Api.getUserList()
  setUser(data.find(item => item.userName === watermark))
}
onMounted(() => {
  foundXsEditor();
  getUserList()
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
    font-size: 22px;
    padding: 12px 0;
    font-weight: 600;
    transform: scale(.96);
  }
  &__detail {
    height: 44px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    background: var(--xs-color-info-light-9);
    padding:12px 12px 8px 12px;
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
.result-detail-footer {
  height: 66px;
  width: 100%;
  background: #fff;
  border-radius: 4px;
  margin-top: 6px;
  padding: 6px 18px;
  box-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__left {
    display: flex;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: block;
      margin-right: 12px;
    }
  }

  &__right {
    display: flex;
    align-items: center;
    div {
      margin-right: 12px;
      display: flex;
      align-items: center;
      font-size: 14px;
    }
  }
}
.my-tag {
  display: inline-block;
      border-radius: 14px;
      font-size: 12px;
      padding: 2px 14px;
      transform: scale(.9);
      border: calc(1px / 2) solid var(--xs-color-primary);
      color: var(--xs-color-primary);
}
.card {
  background: #fff;
  width: 100%;
  height: max-content;
  min-height: 100px;
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 2px;
  box-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.1);
}
.result-detail-card-author {

}
</style>
