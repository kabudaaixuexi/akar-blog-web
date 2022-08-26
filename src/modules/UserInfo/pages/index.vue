<template>
  <LayoutArea :showFooter="false">
    <template #top>
      <NavigationNavBar :fixed="false">
        <NavigationSideLogo :title="`${user.userName} 的主页`" />
      </NavigationNavBar>
    </template>

    <!-- <template #sideLeft>

    </template> -->
    <template #content>
      <header class="userinfo-header">
        <img :src="user.photo" alt="" />
        <div class="userinfo-header__detail">
          <p>
            <span class="b500 mr12">{{ user.userName }}</span>
            <span class="f12 c666">{{ user.createdAt }} 加入社区</span>
            <el-button v-if="user.uid === userInfo.uid" @click="() => router.push(`/uf/${user.userName}/up`)" class="ml20" type="primary" :icon="Edit" circle />
          </p>
          <p class="cp">
            <span
              @click="
                () => {
                  ElMessage.error('暂未开放查看粉丝');
                }
              "
              class="f12 mr12"
              >粉丝
              <span class="b500 f14">{{
                JSON.parse(user.extData || "{}").fans?.length || 0
              }}</span></span
            >
            <span
              @click="
                () => {
                  ElMessage.error('暂未开放查看关注');
                }
              "
              class="f12"
              >关注
              <span class="b500 f14">{{
                JSON.parse(user.extData || "{}").follow?.length || 0
              }}</span></span
            >
          </p>
        </div>
      </header>
      <p class="userinfo-brief mt20 f12 b500">{{user.userIntro || '这个人没有任何简介'}}</p>
      <el-card class="userinfo-card mt20">
         <el-row :gutter="24">
          <el-col :span="8">
            邮箱： <span class="b500">{{user.userEmail || '未填写'}}</span>
          </el-col>
          <el-col :span="8">
            生日： <span class="b500">{{user.userBirth || '未填写'}}</span>
          </el-col>
          <el-col :span="8">
            职位： <span class="b500">{{user.userOffice || '未填写'}}</span>
          </el-col>
        </el-row>
      </el-card>
      <article class="userinfo-center mt12">
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
        <img @click="() => router.push('/project')" src="@/assets/images/rg.png" alt="">
        <Introduce v-if="user.showExtend" :state="JSON.parse(user.userExtend || '{}')" />
        <OtherChain v-if="user.showLinks" :state="JSON.parse(user.userLinks || '[]')" />
        <Dialogue :state="getState()" />
      </article>
    </template>
  </LayoutArea>
</template>

<script lang="ts" setup>
import NavigationSideLogo from "@/components/Navigation/Side/SideLogo.vue";
import NavigationNavBar from "@/components/Navigation/NavBar.vue";
import CommonItem from "@/modules/Common/components/CommonItem.vue";
import Introduce from "@/modules/UserInfo/components/Introduce.vue"
import OtherChain from "@/modules/UserInfo/components/OtherChain.vue"
import Dialogue from "@/modules/UserInfo/components/Dialogue.vue"
import { useRoute, useRouter } from "vue-router";
import Cookies from "js-cookie";
import { onMounted, computed } from "vue";
import Store from "@/store";
import Api from "@/api";
import { useState } from "@akar/vue-hooks";
import { Edit } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
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
    count += i.extData.star?.length || 0;
  });
  return count;
});
const skim = computed(() => {
  let count = 0;
  list.value.map((i) => {
    count += i.extData.skim?.length || 0;
  });
  return count;
});

onMounted(async () => {
  document.title = `${route.params.uid} 的个人主页`;
  const { data: user } = await Api.getUser({ uid: route.params.uid });
  setUser(user);
  getList(0);
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
}
.userinfo-card {
  width: 70%;
  font-size: 12px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.userinfo-center {
  width: 70%;
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
