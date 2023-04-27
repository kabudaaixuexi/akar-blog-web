<template>
    <article class="usersuggest-container BgColor_Content">
        <header>作者推荐</header>
        <nav v-for="({uid, userName, userPortrait, userIntro, createdAt}) in userList" :key="uid">
          <img :src="userPortrait" />
          <figure>
            <figcaption>{{ userName }}{{ createdAt }}</figcaption>
            <figcaption>{{ userIntro }}</figcaption>
          </figure>
          <el-button
              type="primary"
              @click="() => handleFollow(item)"
              size="small"
              :icon="Minus"
              circle
            />
        </nav>
    </article>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import Api from '@/api'
import Cookie from "js-cookie";
import { useState } from '@akar/vue-hooks';
import { Edit, Plus, Minus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

const userInfo = JSON.parse(Cookie.get("userInfo") || "{}");
const [userList, setUserList] = useState([])

const getUserList = async () => {
   setUserList(await Api.getUserList())
}

const handleFollow = async (
  { userName, extData,}
) => {
  if (!Object.getOwnPropertyNames(userInfo).length) return ElMessage.error("登录后才能进行关注");
    // 加粉丝
    await Api.postDecorate({
      userName,
      extData: JSON.stringify(
        {
          ...JSON.parse(extData || '{}'),
          fans: [...extData.fans, {
            userName: userInfo.userName,
            userPortrait: userInfo.userPortrait
          }],
        }
      ),
    });
    const temExtData = JSON.stringify(
        {
          ...JSON.parse(userInfo.extData),
          follow: Array.from(new Set([...(JSON.parse(userInfo.extData).follow || []), {
            userName: userInfo.userName,
            userPortrait: userInfo.userPortrait
          }])),
        }
      )
    // 加关注
    await Api.postDecorate({
      userName: userInfo.userName,
      extData: temExtData,
    });
    Cookie.set("userInfo", JSON.stringify({
      ...userInfo,
      extData: temExtData
    }));
    ElMessage.success("关注成功");
}

onMounted(() => {
  setTimeout(() => getUserList(), 0)
});
</script>

<style lang="scss" scoped>
.usersuggest-container {

}
</style>
