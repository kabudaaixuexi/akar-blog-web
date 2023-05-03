<template>
  <LayoutArea :showFooter="false" :sideLeftWidth="388">
    <template #top>
      <NavigationNavBar :fixed="false">
        <NavigationSideLogo :title="`${user.userName} 的主页`" />
      </NavigationNavBar>
    </template>

    <template #sideLeft >
        <AboutInfo v-if="user" :user="user"/>
        <Cat />
    </template>

    <template #content>
      <header class="userinfo-header">
        <img v-if="userInfo.userPortrait" :src="userInfo.userPortrait" />
        <img v-else src="@/assets/images/navigation-avatar.webp" />
        <div class="userinfo-header__detail">
          <p>
            <span class="b500 mr12 Color_Content">{{ user.userName }}</span>
            <span v-if="user.createdAt" class="f12 c666">{{ user.createdAt }} 加入社区</span>
            <el-button v-if="user.uid === userInfo.uid" @click="() => router.push(`/uf/${user.uid}/up`)" class="ml20" type="primary" :icon="Edit" circle />
          </p>
        </div>
      </header>
      <p class="userinfo-brief mt20 f12 b500 Color_Content">{{user.userIntro || '这个人没有任何简介'}}</p>
      <el-card v-if="user.userEmail || user.userOffice || user.userBirth" class="BgColor_Content userinfo-card mt20">
         <el-row :gutter="24">
          <el-col :key="key" v-for="(item, key) in introduceMap" :span="8">
            <div class="Color_Content" v-if="user[item[1]]">
              {{item[0]}} <span class="b500">{{user[item[1]]}}</span>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <article class="userinfo-center Color_Content mt12">
        <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="(e) => getList(e.props.name)">
          <el-tab-pane v-for="(item, key) in tabs" :key="key" :label="item.label" :name="item.type">
            <p v-if="item.show" class="userinfo-remark f12">
              ta 贡献 {{ list.length }} 篇好文， 共收到 {{ star }} 个点赞， 被 {{ skim }} 次浏览。
            </p>
            <div style="transform: scale(0.97)">
              <CommonItem v-for="(item, index) in list" :key="index" :dataset="item" :list="list" />
            </div>
            <div v-if="!list.length" class="project-empty-box">
              <img src="@/assets/images/project-empty.svg" alt="Empty" />
              <span>{{ "空的～" }}</span>
            </div>
          </el-tab-pane>
        </el-tabs>
      </article>

      <article class="extra">
        <img @click="() => router.push('/kv5i')" src="@/assets/images/rg.png" alt="">
        <Introduce v-if="user.showExtend" :state="user.userExtend" />
        <OtherChain v-if="user.showLinks" :state="user.userLinks" />
        <Annex v-if="user.showAnnexs" />
        <Dialogue :state="getState()" />
      </article>
    </template>
  </LayoutArea>
</template>

<script lang="ts" setup>
import NavigationSideLogo from "@/components/Navigation/Side/SideLogo.vue";
import NavigationNavBar from "@/components/Navigation/NavBar.vue";
import AboutInfo from "@/components/Plates/AboutInfo.vue"
import CommonItem from "@/modules/Common/components/CommonItem.vue";
import Introduce from "@/modules/UserInfo/components/Introduce.vue"
import OtherChain from "@/modules/UserInfo/components/OtherChain.vue"
import Dialogue from "@/modules/UserInfo/components/Dialogue.vue"
import Annex from "@/modules/UserInfo/components/Annex.vue"
import Cat from "@/components/Plates/Cat.vue";
import { useRoute, useRouter } from "vue-router";
import Cookies from "js-cookie";
import { onMounted, computed, watch } from "vue";
import Api from "@/api";
import { useState } from "@akar/vue-hooks";
import { Edit } from "@element-plus/icons-vue";
import { introduceMap } from '../data'
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
const route = useRoute();
const router = useRouter();
const tabs = [
  {
    label: "ta创作的文章",
    type: 0,
    show: true,
  },
  {
    label: "ta收藏的文章",
    type: 4,
    show: false,
  },
  {
    label: "ta点赞的文章",
    type: 3,
    show: false,
  },
];
// 作者信息
const [user, setUser] = useState({});
const getState = () => user
// 标签页
const [activeTab, setActiveTab] = useState(0);
// 文章列表
const [list, setList] = useState([]);
const getList = async (type) => {
  const { data: list } = await Api.getNoteListPublished({ type, uid: route.params.uid });
  setList(list);
};
const star = computed(() => {
  let count = 0;
  list.value.map((i) => {
    count += i.extData?.star?.length || 0;
  });
  return count;
});
const skim = computed(() => {
  let count = 0;
  list.value.map((i) => {
    count +=  Number(i.extData?.skim || 0)
  });
  return count;
});
const createdInit = async (uid) => {
  if (!uid) return
  document.title = `${uid} 的主页`;
  const { data: user } = await Api.getUserInfo({ uid });
  setUser(user);
  getList(0);
}
watch(
    () => route.params,
    (val) => createdInit(val.uid),
);
onMounted(() => {
  createdInit(route.params.uid)
});
</script>

<style lang="scss" scoped>
.userinfo-header {
  width: 100%;
  display: flex;
  &__detail {
    padding: 2px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  img {
    width: 48px;
    height: 48px;
    border-radius: 10%;
    margin-right: 18px;
  }
}
.userinfo-brief {
  border-radius: 6px;
  width: 55%;
  padding: 4px 12px;
}
.userinfo-card {
  width: 70%;
  font-size: 12px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.userinfo-center {
  width: 70%;
  height: 88%;
  padding: 4px 12px;
  .userinfo-remark {
    width: 100%;
    padding: 12px;
    border-radius: 2px;
    background: #bad2d8;
    // font-family:Georgia, 'Times New Roman', Times, serif;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  }
  .project-empty-box {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-top: 171px;
      & > img {
        width: 100px;
      }
      & > span {
        font-size: 12px;
        font-family:serif;
        line-height: 14px;
        color: #606266;
      }
    }
}

.extra {
  position: absolute;
  width: 44%;
  top: 0;
  height: 100%;
  right: 0;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  padding-right: 30px;
  img {
    width: 90%;
    margin-top: 30px;
  }
  .extra-art1 {
    margin-top: 30px;
    width: 60%;
    height: 300px;
    background-color: #bad2d8;
  }
}
</style>
