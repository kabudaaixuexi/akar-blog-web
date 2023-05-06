<template>
  <section class="realtime-container f12 BgColor_Content">
    <div class="title mb12">沸点（实时）</div>
    <header class="">
      <el-input
        :maxlength="100"
        type="textarea"
        v-model="content"
      />
      <div style="display: flex; justify-content: flex-end">
        <el-button class="mt20" @click="handleSubmit" :size="'small'" type="primary">发布一条新沸点</el-button>
      </div>
    </header>

    <article class="realtime-container__ul Color_Content_Unhover ">
       <figure class="new-forum" v-for="(item, ind) in forumList" :key="ind">
          <div class="realtime-container-info">
            <img class="mr12" @click="() => router.push(`/uf/${uid}/hp`)" v-if="item.userPortrait" :src="item.userPortrait" />
            <img class="mr12" @click="() => router.push(`/uf/${uid}/hp`)" v-else src="@/assets/images/navigation-avatar.webp" />
            <div>
              <b class="mt2 mb2">{{ item.userName }}
                <small class="c666 ml6"> {{ item.createdAt }}</small>
              </b>
              <span class="otw" style="transform: scale(.9);display: inline-block;margin-left: -15px;">{{ item.userIntro }}</span>
            </div>
          </div>

          <b class="ml6">{{ item.extData.content }}</b>

          <figcaption class="mt12 mb6 realtime-container-star">
            <div v-for="(i, ind) in item.extData.stars" :key="ind">
              <img @click="() => router.push(`/uf/${uid}/hp`)" v-if="i.userPortrait" :src="i.userPortrait" />
              <img @click="() => router.push(`/uf/${uid}/hp`)" v-else src="@/assets/images/navigation-avatar.webp" />
            </div>
            <span v-if="item.extData.stars.length">等人赞过</span>
          </figcaption>

          <div class="realtime-container-option mb12">
            <span @click="() => handleShowEvals(item)">评论
              <small v-if="(item.extData.evals || []).length">（{{ (item.extData.evals || []).length }}）</small>
            </span>
            <span @click="() => handleStar(item)">点赞
              <small v-if="(item.extData.stars || []).length">（{{ (item.extData.stars || []).length }}）</small>
            </span>
            <span @click="() => handleDelete(item)" v-if="item.uid === userInfo.uid">删除</span>
          </div>
          <!-- 展开评论 -->
          <nav class="realtime-container-eval mb20" v-show="item.forumId && currentForum.forumId === item.forumId">
            <div :style="i.reply ? 'padding-left: 30px' : ''" :key="key" v-for="(i, key) in filterEval(item.extData.evals || [])">
              <div class="eval-head ts09">
                <img class="mr6" @click="() => router.push(`/uf/${uid}/hp`)" v-if="i.userPortrait" :src="i.userPortrait" />
                <img class="mr6" @click="() => router.push(`/uf/${uid}/hp`)" v-else src="@/assets/images/navigation-avatar.webp" />
                <div class="eval-head__other ts09 Color_Content_Unhover">
                  <b>{{ i.userName }}
                    <small v-if="i.userName === item.userName">( 作者 )</small>
                    <span class="reply" v-if="i.reply">&nbsp;回复&nbsp;<u>{{i.reply}}</u>&nbsp;的评论</span></b>
                  <p>{{ i.evalTime}}</p>
                </div>
              </div>
              <div class="eval-cont ts09 Color_Content_Unhover">
                {{i.evalContent}}
              </div>
              <div class="eval-option ts09 Color_Content_Unhover">
                <b @click="() => handleWriteEval(i)"><el-icon><Comment /></el-icon> 回复</b>
                <b v-if="userInfo.userName === i.userName" @click="() => handleDeleteEval(i)"><el-icon><DeleteFilled /></el-icon> 删除</b>
              </div>
            </div>
            <div class="flex-center-end">
              <el-button class="mr12 mt12 mb12 ts09" @click="() => handleWriteEval(item)" :size="'small'" type="primary">发表评论</el-button>
            </div>
          </nav>
       </figure>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { inject, onMounted, onUnmounted, h } from "vue";
import { Socket } from "socket.io-client";
import { getTime, getUuiD } from "@/utils";
import Cookies from "js-cookie";
import Api from "@/api";
import { ElMessage, ElMessageBox } from "element-plus";
import { useState } from "@akar/vue-hooks";
const socket = inject("socket") as Socket;
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
const [content, setContent] = useState('')
const [forumList, setForumList] = useState([])
const [currentForum, setCurrentForum] = useState({})
const [myEval, setMyEval] = useState('')

const handleShowEvals = (item) => {
  if (currentForum.value.forumId === item.forumId) {
    setCurrentForum({})
  } else {
    setCurrentForum(item)
  }
}
const getForumAll = async () => {
  const { data } = await Api.getForumAll()
  const temData = data.map(i => ({
    ...i,
    extData: JSON.parse(i.extData || '{}')
  }))
  setForumList(temData)
  if (currentForum.value.forumId && temData.find(item => item.forumId === currentForum.value.forumId)) {
    setCurrentForum(temData.find(item => item.forumId === currentForum.value.forumId))
  }
}
const initSocketIo = () => {
  // 加入通信
  socket.on("forum", (payload) => {
    if(!payload) {
      getForumAll()
      return
    }
    if (document.querySelector('.new-forum')) {
      (document.querySelector('.new-forum') as HTMLElement).className += ' anime-new-forum';
      setTimeout(() => (document.querySelector('.new-forum') as HTMLElement).className = 'new-forum', 500)
    }
    payload.extData = JSON.parse(payload.extData || '{}')
    setForumList([
      payload,
      ...forumList.value
    ])
  });
  getForumAll()
};
const handleDelete = async (info) => {
  await Api.deleteForum({
    forumId: info.forumId
  })
  getForumAll()
  ElMessage.success('删除成功')
  socket.emit('forum', null)
}
// 发布沸点
const handleSubmit = () => {
  if (!userInfo.userName) {
    ElMessage.error("登录后才能发布哦～");
    return;
  }
  if (!content.value) {
    ElMessage.error("不能发布空内容哦～");
    return;
  }
  console.log(socket);

  socket.emit('forum', {
    uid: userInfo.uid,
    forumId: getUuiD(),
    userName: userInfo.userName,
    userIntro: userInfo.userIntro,
    userGender: userInfo.userGender,
    userRegion: userInfo.userRegion,
    userOffice: userInfo.userOffice,
    userPortrait: userInfo.userPortrait,
    createdAt: getTime(),
    extData: JSON.stringify({
      content: content.value,
      evals:[],
      stars:[]
    })
  })
  setContent('')
}
// 点赞
const handleStar = async (info) => {
  let temExtData;
  const temStars = info.extData.stars
  if (temStars.map(i => i.uid).includes(userInfo.uid)) {
    temExtData = {
      ...info.extData,
      stars: temStars.filter(item => item.uid !== userInfo.uid)
    }
  } else {
    temExtData = {
      ...info.extData,
      stars: [...temStars, {
        starTime: getTime(),
        userName: userInfo.userName,
        userPortrait: userInfo.userPortrait,
        uid: userInfo.uid
      }]
    }
  }
  await Api.editForum({
    forumId: info.forumId,
    extData: JSON.stringify(temExtData),
  });
  getForumAll()
  ElMessage.success('操作成功')
  socket.emit('forum', null)
}
// 删除评价
const handleDeleteEval = async (info) => {
  let temExtData;
  ElMessageBox.confirm('确定删除该条评论？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(async () => {
    if (!info.reply) {
      temExtData = {
        ...currentForum.value.extData,
        evals: currentForum.value.extData.evals.filter(i => (i.evalId !== info.evalId)),
      };
    }else {
      temExtData = {
        ...currentForum.value.extData,
        evals: currentForum.value.extData.evals.filter(i => (i.id !== info.id)),
      };
    }
    await Api.editForum({
      forumId: currentForum.value.forumId,
      extData: JSON.stringify(temExtData),
    });
    getForumAll()
    ElMessage.success('已删除该评论')
    socket.emit('forum', null)
  })
}
// 写评价
const handleWriteEval = (info) => {
  if (!Object.getOwnPropertyNames(userInfo).length) {
    ElMessage.error("登录后才能进行评论");
    return
  }
  ElMessageBox({
    title: '写下你的评论..',
    confirmButtonText: '发表',
    message: h('textarea', { oninput: (e) => setMyEval(e.target.value), style: 'font-family: serif;color: #333;font-size: 14px;padding:10px;width: 100%;border-color: #c0c4cc;border-radius: 4px;', rows:"5", }),
  }).then(async () => {
      let temExtData;
      let newEval = currentForum.value.extData.evals || []

      // 发表对文章的评论
      if (!info.evalId) {
        newEval.splice(0,0,{
            id: getUuiD(),
            evalId: getUuiD(),
            reply: false,
            evalTime: getTime(),
            userName: userInfo.userName,
            userPortrait: userInfo.userPortrait,
            evalContent: myEval.value
        })
        temExtData = {
          ...currentForum.value.extData,
          evals: newEval,
        };
      } else {
        console.log(newEval,'lll');
        // 回复回复
        if (info.reply) {
          newEval.splice(newEval.map(i => i.id).lastIndexOf(info.id) + 1,0,{
              id: getUuiD(),
              evalId: info.evalId,
              reply: info.userName + `：${info.evalContent}`,
              evalTime: getTime(),
              userName: userInfo.userName,
              userPortrait: userInfo.userPortrait,
              evalContent: myEval.value
          })
        } else {
          newEval.splice(newEval.map(i => i.evalId).lastIndexOf(info.evalId) + 1,0,{
              id: getUuiD(),
              evalId: info.evalId,
              reply: info.userName  + `：${info.evalContent}`,
              evalTime: getTime(),
              userName: userInfo.userName,
              userPortrait: userInfo.userPortrait,
              evalContent: myEval.value
          })
        }
        temExtData = {
          ...currentForum.value.extData,
          evals: newEval,
        };
      }
      await Api.editForum({
        forumId: currentForum.value.forumId,
        extData: JSON.stringify(temExtData),
      });
      getForumAll()
      ElMessage.success('发表评价成功')
      socket.emit('forum', null)
  })
}
const filterEval = (list = []) => {
  const newList = list
  .sort((x,y) => (y.evalId - x.evalId))
  return newList
}

onMounted(() => {
  initSocketIo();
});
onUnmounted(() => {
  socket.removeAllListeners("forum");
});
</script>

<style lang="scss" scoped>
.realtime-container {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 0 1px 0 var(--shadowColor_Content);
  display: flex;
  flex-direction: column;
  .title {
    font-weight: 500;
    padding: 12px;
    font-family:monospace;
    background-color: var(--el-color-primary-light-9);
  }
  header {
    transform: scale(.9);
  }
  &__ul {
    overflow-y: scroll;
    padding: 6px;
    transform: scale(.96);
    flex: 1;
    figure {
      padding: 12px 6px 0 6px;
      background-color: var(--bgEmpty_Content);
      border-radius: 4px;
      .realtime-container-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 12px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f6f6f6;
          cursor: pointer;
        }
        div{
          display: flex;
          flex-direction: column;
          flex: 1;
        }
      }
      .realtime-container-star {
        display: flex;
        align-items: center;
        transform: scale(.8);
        justify-content: flex-end;
        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin-right: 4px;
        }
      }
      .realtime-container-option {
        display: flex;
        justify-content: space-between;
        background-color: var(--bgEmpty_Content);
        border-top: calc(1px / 3) solid var(--shadowColor_Content) ;
        transform: scale(.96);
        span{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50%;
          transform: scale(.85);
          height: 36px;
          cursor: pointer;

        }
      }
      .realtime-container-eval {
        background-color: var(--bgEmpty_Content);
        transition: all 1s
      }
    }

  }
}
.eval-head {
    display: flex;
    align-items: center;
    padding-top: 6px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    &__other {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      border-radius: 2px;
      p {
        font-size: 12px;
        padding-top: 2px;
        color: #999;
      }
      .reply {
        font-size: 12px;
        color: #999;
        font-family: sans-serif;
        font-weight: 400;
      }
    }
  }
  .eval-cont {
    padding-left: 40px;
    padding-top: 6px;
  }
  .eval-option {
    padding: 6px 0 18px 24px;
    border-bottom: calc(1px / 2) solid var(--shadowColor_Content);
    display: flex;
    b {
      cursor: pointer;
      display: flex;
      font-size: 12px;
      align-items: center;
      width: 40px;
      font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
      justify-content: space-between;
    }
  }


.anime-new-forum {
  animation: new-forum .5s forwards ;
}
@keyframes new-forum{
  0% {
    opacity: .4;
    transform: scale(0) translateY(-120%);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
