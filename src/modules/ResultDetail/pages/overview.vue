<template>
  <LayoutArea :showFooter="false">
    <template #top>
      <NavigationNavBar :fixed="false">
        <NavigationSideGoBack :title="'返回'" />
      </NavigationNavBar>
    </template>

    <template #sideLeft>
      <BloggerCard :getState="() => (noteInfo)" />
      <figure v-if="noteInfo.cover" class="cover mb12">
        <img :src="noteInfo.cover" />
      </figure>
      <figure class="calendar">
        <baidu-calendar @change="() => {}"  />
      </figure>
    </template>
    <template #content>
      <header class="result-detail-header">
        <div class="result-detail-header__title">{{ noteInfo.subtitle || "--" }}</div>
        <div class="result-detail-header__detail">
          <p>
            <span style="padding-right: 24px"
              ><span class="cp" @click="() => router.push(`/uf/${noteInfo.uid}/hp`)" style="color: #000; padding-right: 12px">{{ noteInfo.uid }}</span>
              <span style="padding-left: 6px; color: var(--xs-color-info)"
                >于 {{ noteInfo.latestTime }} 发布</span
              >
              <span style="padding-left: 6px; color: var(--xs-color-info)"
                >已有 {{ noteInfo.extData?.eval?.length || 0 }} 条评论</span
              >
            </span>
          </p>
        </div>
        <div class="result-detail-header__options flex">
          <figcaption class="f12 ml12">标签：</figcaption>
          <el-tag
            v-for="item in noteInfo.tags"
            :key="item"
            type="success"
            effect="plain"
            class="ml12"
          >
            {{ item }}
          </el-tag>
          <span v-if="!noteInfo.tags?.length" class="f12 ml12 c666">无</span>
        </div>
      </header>
      <article id="xs-editor-note"></article>
      <footer class="result-detail-footer">
        <div class="result-detail-footer__left">
          <img v-if="user?.userPortrait" :src="user?.userPortrait" />
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
          <!-- <TooltipCustom :content="`评论功能暂时还未开发～`">
            <div>
              <el-icon :size="16"><ChatLineSquare /></el-icon>
              <span style="padding-left: 6px">{{ noteInfo.extData?.eval?.length || 0 }}</span>
            </div>
          </TooltipCustom> -->
          <div class="my-tag">
            {{ draweOptions.find((i) => i.value == noteInfo.drawe)?.label || "全部" }}
          </div>
        </figure>
      </footer>
      <Comment :getEvals="() => (evals)" :getNoteInfo="() => (noteInfo)"/>
    </template>
  </LayoutArea>
</template>

<script lang="ts" setup>
import NavigationSideGoBack from "@/components/Navigation/Side/SideGoBack.vue";
import NavigationNavBar from "@/components/Navigation/NavBar.vue";
import BloggerCard from '@/components/Plates/BloggerCard.vue'
import Comment from '../components/Comment.vue'
import { useRoute, useRouter } from "vue-router";
import Cookies from "js-cookie";
import { onMounted } from "vue";
import Store from "@/store";
import Api from "@/api";
import foundEdit from "@akar/xs-editor";
import { useState } from '@akar/vue-hooks'
import { Star, Present, Clock, Sugar } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
const draweOptions = Store.getState('noteClassify')
const route = useRoute();
const router = useRouter()
// 文章信息
const [noteInfo, setNoteInfo] = useState({})
// 作者信息
const [user, setUser] = useState({});
// 点赞评论收藏
const [stars, setStars] = useState([]);
const [takes, setTakes] = useState([]);
const [evals, setEvals] = useState([]);

const checkLogin = () => {
  if (!Object.getOwnPropertyNames(userInfo).length) {
    ElMessage.error("登录后才能进行点赞");
  }
  return Object.getOwnPropertyNames(userInfo).length
}
// 点赞
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
// 收藏
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
  setEvals(data.extData?.eval || [])
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

.cover {
  padding: 6px;
  background-color: #fff;
  border-radius: 4px;
  min-height: 80px;
    img {
      width: 100%;
    }
}
.calendar {
  width: 100%;
  height: 316px;
  padding: 6px;
  background-color: #fff;
  border-radius: 4px;
  &:deep() {
    .op-calendar-pc {
      box-shadow: none;
    }
    .op-calendar-pc-left {
      transform: scale(.64) translate(-141px,-133px);
      border: none;
    }
  }
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
    border: calc(1px / 2) solid var(--xs-color-primary-light-9);
    margin-top: 12px;
    height: 36px;
    width: 100%;
    align-items: center;
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
