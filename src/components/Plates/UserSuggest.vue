<template>
    <article class="usersuggest-container BgColor_Content">
        <header class="usersuggest-container__header">作者推荐</header>
        <div class="usersuggest-container__box">
          <nav class="usersuggest-container__user" v-for="({uid, userName, userPortrait, userIntro, extData}) in userList" :key="uid">
            <img @click="() => router.push(`/uf/${uid}/hp`)" v-if="userPortrait" :src="userPortrait" />
            <img @click="() => router.push(`/uf/${uid}/hp`)" v-else src="@/assets/images/navigation-avatar.webp" />
            <figure class="Color_Content">
              <figcaption><strong>{{ userName }}</strong></figcaption>
              <figcaption class="c666 otw f12 mt4"><small>{{ userIntro || ' ' }}</small></figcaption>
            </figure>
            <div v-if="(JSON.parse(extData || '{}').fans || []).map(e => e.uid).includes(userInfo.uid)" :class="`usersuggest-container__option followed`">
              已关注
            </div>
            <div @click="() => handleFollow({ uid, userName, userPortrait, extData })" :class="`usersuggest-container__option unfollow`" v-else>
              加关注
            </div>
          </nav>
        </div>
    </article>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import Api from '@/api'
import Cookie from "js-cookie";
import { useState } from '@akar/vue-hooks';
import { ElMessage } from "element-plus";
import { useRouter } from 'vue-router';

const router = useRouter()
const userInfo = JSON.parse(Cookie.get("userInfo") || "{}");
const [userList, setUserList] = useState([])

const getUserList = async () => {
   const { data } = await Api.getUserList({ type: 1})
   setUserList(data.filter(item => item.uid != userInfo.uid))
}

const handleFollow = async (
  { uid, extData, userName, userPortrait }
) => {
  if (!Object.getOwnPropertyNames(userInfo).length) return ElMessage.error("登录后才能进行关注");
    // 加粉丝
    await Api.postDecorate({
      uid,
      extData: JSON.stringify(
        {
          ...JSON.parse(extData || '{}'),
          fans: [...(JSON.parse(extData || '{}').fans || []), {
            uid: userInfo.uid,
            userName: userInfo.userName,
            userPortrait: userInfo.userPortrait
          }],
        }
      ),
    });
    const temExtData = JSON.stringify(
        {
          ...JSON.parse(userInfo.extData || '{}'),
          follow: Array.from(new Set([...(JSON.parse(JSON.parse(Cookie.get("userInfo") || "{}").extData || '{}').follow || []), {
            uid,
            userName,
            userPortrait
          }])),
        }
      )

    // 加关注
    await Api.postDecorate({
      uid: userInfo.uid,
      extData: temExtData,
    });
    Cookie.set("userInfo", JSON.stringify({
      ...userInfo,
      extData: temExtData
    }));
    ElMessage.success("关注成功");
    getUserList()
}

onMounted(() => {
  setTimeout(() => getUserList(), 0)
});
</script>

<style lang="scss" scoped>
.usersuggest-container {
  width: 100%;
  height: max-content;
  margin-bottom: 12px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 1px 0 var(--shadowColor_Content);
  &__box {
    min-height: 132px;
    max-height: 324px;
    overflow-y: scroll;
  }
  &__header {
    font-weight: 500;
    padding: 12px;
    background-color: var(--el-color-warning-light-9);
    font-family:monospace;
  }
  &__user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px 12px 12px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #f6f6f6;
      cursor: pointer;
    }
    figure {
      flex: 1;
      height: 100%;
      padding: 0 12px;
      display: flex;
      flex-direction: column;
    }
  }
  &__option {
    border-radius: 10%;
    padding: 6px 12px;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    transform: scale(.8);
  }
  .unfollow {
    cursor: pointer;
    background-color: var(--el-color-warning-light-7);
  }
  .followed {
    cursor: no-drop;
    background-color: #f6f6f6;
    color: #999;
  }
}
</style>
