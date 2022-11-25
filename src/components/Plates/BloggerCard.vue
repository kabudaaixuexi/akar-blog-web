<template>
  <div
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    class="blogger-card-container"
  >
    <header class="blogger-card-container__header">
      <img class="cp" @click="() => router.push(`/uf/${user.userName}/hp`)" v-if="user.userPortrait" :src="user.userPortrait" alt="" />
      <img v-else src="../../assets/images/navigation-avatar.webp" alt="" />
      <figure>
        <span style="font-weight: 500">{{ user.userName || "--" }}</span>
        <span style="font-size: 12px; color: #666">{{ user.createdAt }} 加入社区</span>
      </figure>
    </header>
    <article class="blogger-card-container__harvest">
      <div>
        <span class="b500">{{ pulish.length || 0 }}</span>
        <span class="c666">原创</span>
      </div>
      <div>
        <span class="b500">{{ skim.length || 0 }}</span>
        <span class="c666">浏览</span>
      </div>
      <div>
        <span class="b500">{{ star.length || 0 }}</span>
        <span class="c666">获赞</span>
      </div>
      <div>
        <span class="b500">{{ take.length || 0 }}</span>
        <span class="c666">收藏</span>
      </div>
    </article>
    <article class="blogger-card-container__info">
      <div>
        <span class="b500">{{ fans.length || 0 }}</span>
        <span class="c666">粉丝</span>
      </div>
      <div>
        <span class="b500">{{ follow.length || 0 }}</span>
        <span class="c666">关注</span>
      </div>
      <div>
        <span class="b500">{{ integral }}</span>
        <span class="c666">积分</span>
      </div>
    </article>
    <article v-if="userInfo.userName != user.userName" class="blogger-card-container__footer">
      <div @click="handleFollow">
        {{ fans.find(ev => ev.userName == userInfo.userName) ? "已关注" : "关 注" }}
      </div>
      <div @click="handleDialogue">私 信</div>
    </article>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import Cookie from "js-cookie";
import Api from "@/api";
import { useRouter } from 'vue-router'
import { useState } from "@akar/vue-hooks";
import { ElMessage } from "element-plus";
const svg = `
  <svg t="1653073827880" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="32474" width="32" height="32"><path d="M511.999 89.638C282.053 89.638 95.035 273.4 89.763 502.08c4.884-199.52 156.598-359.646 343.044-359.646 189.526 0 343.169 165.46 343.169 369.566 0 43.738 35.456 79.193 79.193 79.193 43.738 0 79.193-35.455 79.193-79.193 0-233.264-189.097-422.362-422.363-422.362z m0 844.724c229.947 0 416.967-183.763 422.238-412.44-4.884 199.52-156.599 359.645-343.045 359.645-189.527 0-343.17-165.459-343.17-369.566 0-43.737-35.455-79.193-79.192-79.193S89.637 468.263 89.637 512c0 233.266 189.098 422.362 422.362 422.362z" p-id="32475" fill="#a0cfff"></path></svg>
`;
const router = useRouter()
const userInfo = JSON.parse(Cookie.get("userInfo") || "{}");
const [user, setUser] = useState({});
const [loading, setLoading] = useState(true);
const [pulish, setPulish] = useState([]);
const [skim, setSkim] = useState([]); // 浏览
const [take, setTake] = useState([]); // 收藏
const [star, setStar] = useState([]); // 点赞
const [integral, setIntegral] = useState(0); // 积分

const [fans, setFans] = useState([]); // 粉丝
const [follow, setFollow] = useState([]); // 关注
const props = defineProps<{ getState: any }>();

const getList = async () => {
  console.log(props.getState(),'props.getState().value');
  const { uid } = props.getState();
  const { data: user } = await Api.getUser({ uid });
  setUser(user);
  setFans(JSON.parse(user.extData || '{}').fans || []);
  setFollow(JSON.parse(user.extData || '{}').follow || []);
  const { data: pulish } = await Api.getNoteListPublished({ type: 0, uid });
  setPulish(pulish);
  // 计算浏览 获赞 被收藏
  let temStar:any[] = [], temTake:any[] = [], temSkim:any[] = []
  pulish.forEach(et => {
    const extData = et.extData || {}
    temStar = [...temStar, ...(extData.star || [])]
    temTake = [...temTake, ...(extData.take || [])]
    temSkim = [...temSkim, ...(extData.skim || [])]
  });
  setStar(temStar);setSkim(temSkim);setTake(temTake);
  setIntegral(pulish.length * 100 + fans.value.length * 100 + temSkim.length * 1 + temStar.length * 20 + temTake.length * 50) // 积分计算规则：原创 = 100; 粉丝 = 100; 浏览 = 1; 获赞 = 20; 被收藏 = 50;
  setLoading(false);
};
// 关注 follow // fans
const handleFollow = async () => {
  if (!Object.getOwnPropertyNames(userInfo).length) {
    ElMessage.error("登录后才能进行关注");
    return
  }
  const { uid } = props.getState();
  const rd = fans.value.find(ev => ev.userName == userInfo.userName)
  if (rd) {
    // 减粉丝
    await Api.postDecorate({
      uid,
      extData: JSON.stringify(
        {
          ...JSON.parse(user.value.extData),
          fans: [...fans.value.filter((i) => i.userName !== userInfo.userName)],
        }
      )
     ,
    });
    setFans([...fans.value.filter((i) => i.userName !== userInfo.userName)])
    ElMessage.success("已取消关注");
    // 减关注
    const extData = JSON.stringify(
        {
          ...JSON.parse(userInfo.extData),
          follow: JSON.parse(userInfo.extData).follow.filter((i) => i !== uid),
        }
      )
    await Api.postDecorate({
      uid: userInfo.userName,
      extData
    });
    Cookie.set("userInfo", JSON.stringify({
      ...userInfo,
      extData
    }));
  } else {
    // 加粉丝
    await Api.postDecorate({
      uid,
      extData: JSON.stringify(
        {
          ...JSON.parse(user.extData || '{}'),
          fans: [...fans.value, {
            userName: userInfo.userName,
            userPortrait: userInfo.userPortrait
          }],
        }
      ),
    });
    setFans([...fans.value, {
            userName: userInfo.userName,
            userPortrait: userInfo.userPortrait
          }]);
    ElMessage.success("关注成功");

    // 加关注
    const extData = JSON.stringify(
        {
          ...JSON.parse(userInfo.extData),
          follow: Array.from(new Set([...(JSON.parse(userInfo.extData).follow || []), uid])),
        }
      )
    await Api.postDecorate({
      uid: userInfo.userName,
      extData,
    });
    Cookie.set("userInfo", JSON.stringify({
      ...userInfo,
      extData
    }));
  }
};

// 私信
const handleDialogue = () => {
  if (!Object.getOwnPropertyNames(userInfo).length) {
    ElMessage.error("登录后才能私信该文章作者");
    return
  }
  router.push(`/bu4g/${user.value.userName}`)
}
onMounted(() => {
  if (props.getState().uid) {
    getList()
  } else {
    setTimeout(() => {
      getList()
    }, 1888);
  }
});
</script>

<style lang="scss" scoped>
.blogger-card-container {
  position: relative;
  background: #fff;
  overflow: hidden;
  width: 100%;
  min-height: 180px;
  margin-bottom: 12px;
  padding-bottom: 18px;
  border-radius: 6px;
  box-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.1);
  &__header {
    display: flex;
    padding: 12px;
    img {
      display: block;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 12px;
    }
    figure {
      font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  &__harvest {
    display: grid;
    font-size: 12px;
    transform: scale(0.94);
    padding: 6px 12px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    div {
      height: 36px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
  }
  &__info {
    display: grid;
    font-size: 12px;
    padding: 6px 0;
    transform: scale(0.9);
    border-top: calc(1px / 2) solid var(--xs-color-info-light-9);
    grid-template-columns: 1fr 1fr 1fr;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    div {
      height: 36px;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      align-items: center;
      justify-content: space-between;
    }
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 0 10%;
    margin-top: 12px;
    div {
      padding: 3px 40px;
      white-space: nowrap;
      display: grid;
      place-content: center;
      border-radius: 22px;
      border: calc(1px / 2) solid var(--xs-color-info);
      transition: all 0.2s;
      transform: scale(0.9);
      &:hover {
        transform: scale(1);
        cursor: pointer;
        background-color: var(--xs-color-warning-light-8);
        border: none;
      }
    }
  }
}
</style>
