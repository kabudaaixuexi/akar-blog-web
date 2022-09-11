<template>
  <LayoutArea :showFooter="false">
    <template #top>
      <NavigationNavBar :fixed="false">
        <NavigationSideGoBack :title="'返回'" />
      </NavigationNavBar>
    </template>

    <template #sideLeft>
      <BloggerCard :getState="getNoteInfo" />
      <!-- <BlogRanking :type="6"/> -->
    </template>
    <template #content>
      <header class="result-detail-header">
        <div class="result-detail-header__title">{{ noteInfo.subtitle || "--" }}</div>
        <div class="result-detail-header__detail">
          <p>
            <span style="padding-right: 24px"
              ><span class="cp" @click="() => router.push(`/uf/${noteInfo.uid}/hp`)" style="color: #000; padding-right: 12px">{{ noteInfo.uid }}</span>
              <!-- <span
                ><el-icon color="var(--xs-color-primary)" :size="16"><Clock /></el-icon
              ></span> -->
              <span style="padding-left: 6px; color: var(--xs-color-info)"
                >于 {{ noteInfo.latestTime }} 发布</span
              >
              <!-- <span style="padding-left: 12px"
                ><el-icon color="var(--xs-color-primary)" :size="16"><ChatLineSquare /></el-icon
              ></span> -->
              <span style="padding-left: 6px; color: var(--xs-color-info)"
                >已有 {{ noteInfo.extData?.eval?.length || 0 }} 条评论</span
              >
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
        <div class="result-detail-header__options"></div>
      </header>
      <article id="xs-editor-note"></article>
      <footer class="result-detail-footer">
        <div class="result-detail-footer__left">
          <img v-if="user.photo" :src="user.photo" />
          <img v-else src="@/assets/images/navigation-avatar.webp" />
          <b>{{ noteInfo.uid }}</b>
        </div>
        <figure class="result-detail-footer__right">
          <TooltipCustom
            :content="
              stars.length
                ? `${stars[0]} 在内的 ${stars.length} 位用户觉得很赞！`
                : '为文章点上第一个赞吧～'
            "
          >
            <div @click="changeStar">
              <el-icon :size="16" :color="stars.includes(userInfo.userName) ? '#FA5555' : ''"
                ><Sugar /></el-icon
              ><span
                :style="`padding-left: 6px;color: ${
                  stars.includes(userInfo.userName) ? '#FA5555' : ''
                }`"
                >{{ stars.length }}</span
              >
            </div>
          </TooltipCustom>
          <TooltipCustom
            :content="
              takes.length
                ? `${takes[0]} 在内的 ${takes.length} 位用户收藏了该文章`
                : '成为第一名收藏的用户～'
            "
          >
            <div @click="changeTake">
              <el-icon :size="16" :color="takes.includes(userInfo.userName) ? '#FA5555' : ''"
                ><Star /></el-icon
              ><span
                :style="`padding-left: 6px;color: ${
                  takes.includes(userInfo.userName) ? '#FA5555' : ''
                }`"
                >{{ takes.length }}</span
              >
            </div>
          </TooltipCustom>
          <TooltipCustom :content="`评论功能暂时还未开发～`">
            <div>
              <el-icon :size="16"><ChatLineSquare /></el-icon>
              <span style="padding-left: 6px">{{ noteInfo.extData?.eval?.length || 0 }}</span>
            </div>
          </TooltipCustom>
          <div class="my-tag">
            {{ draweOptions.find((i) => i.value == noteInfo.drawe)?.label || "全部" }}
          </div>
        </figure>
      </footer>
    </template>
  </LayoutArea>
</template>

<script lang="ts" setup>
import NavigationSideGoBack from "@/components/Navigation/Side/SideGoBack.vue";
import NavigationNavBar from "@/components/Navigation/NavBar.vue";
import BloggerCard from '@/components/Plates/BloggerCard.vue'
import BlogRanking from '@/components/Plates/BlogRanking.vue'
import { useRoute, useRouter } from "vue-router";
import Cookies from "js-cookie";
import { onMounted } from "vue";
import Store from "@/store";
import Api from "@/api";
import foundEdit from "@akar/xs-editor";
import { useState } from '@akar/vue-hooks'
import { Star, ChatLineSquare, Present, Clock, Sugar } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
const draweOptions = Store.getState('noteClassify')
const route = useRoute();
const router = useRouter()
// 文章信息
const [noteInfo, setNoteInfo] = useState({})
const getNoteInfo = () => { return noteInfo.value }
// 作者信息
const [user, setUser] = useState({});
// 点赞评论收藏
const [stars, setStars] = useState([]);
const [takes, setTakes] = useState([]);

const checkLogin = () => {
  if (!Object.getOwnPropertyNames(userInfo).length) {
    ElMessage.error("登录后才能进行点赞");
  }
  return Object.getOwnPropertyNames(userInfo).length
}
const changeStar = async () => {
  if (!checkLogin()) {
    return;
  }
  let temExtData;
  if (!stars.value.includes(userInfo.userName)) {
    temExtData = {
      ...noteInfo.value.extData,
      star: [...stars.value, userInfo.userName],
    };
  } else {
    temExtData = {
      ...noteInfo.value.extData,
      star: stars.value.filter((i) => i != userInfo.userName),
    };
  }
  await Api.adornNote({
    ...noteInfo.value,
    extData: temExtData,
  });
  setStars(temExtData.star);
};
const changeTake = async () => {
  if (!checkLogin()) {
    return;
  }
  let temExtData;
  if (!takes.value.includes(userInfo.userName)) {
    temExtData = {
      ...noteInfo.value.extData,
      take: [...takes.value, userInfo.userName],
    };
  } else {
    temExtData = {
      ...noteInfo.value.extData,
      take: takes.value.filter((i) => i != userInfo.userName),
    };
  }
  await Api.adornNote({
    ...noteInfo.value,
    extData: temExtData,
  });
  setTakes(temExtData.take);
};
// const changeEval = async (val) => {
//   if (!Object.getOwnPropertyNames(userInfo).length) {
//     ElMessage.error("登录后才能评论");
//     return;
//   }
//   await Api.adornNote({
//     ...noteInfo,
//     extData: {
//       ...extData,
//       eval: [
//         ...extData?.eval,
//         {
//           uid: userInfo.userName,
//           value: val,
//         },
//       ],
//     },
//   });
// };
// 展示富文本
const foundXsEditor = (value, watermark) => {
  foundEdit(
    document.querySelector("#xs-editor-note"),
    {
      value,
      operable: false,
      watermark,
      pattern: "classic", // silent | classic
    },
    () => {}
  );
};

onMounted(async () => {
  const { data } = await Api.getNoteListPublished({ type: 2, noteid: route.params.noteId });
  setStars(data.extData?.star || [])
  setTakes(data.extData?.take || [])
  setNoteInfo(data)
  document.title = data.subtitle
  foundXsEditor(data.vNode, data.uid);
  const { data: user } = await Api.getUser({ uid:data.uid });
  setUser(user);
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
  width: 100%;
  min-height: calc(100% - 236px);
}

.result-detail-header {
  background: #fff;
  width: 100%;
  padding-bottom: 12px;
  &__title {
    font-size: 22px;
    padding: 12px 0;
    font-weight: 600;
  }
  &__detail {
    height: 44px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    background: var(--xs-color-info-light-9);
    padding: 12px 12px 8px 12px;
    margin: 6px 0;
    border-radius: 4px;
    font-size: 12px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  &__options {
    border: calc(1px / 2) solid var(--xs-color-info-light-9);
    margin-top: 12px;
    height: 36px;
    width: 100%;
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
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    div {
      margin-right: 18px;
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
  transform: scale(0.9);
  border: calc(1px / 2) solid var(--xs-color-primary);
  color: var(--xs-color-primary);
}
</style>
