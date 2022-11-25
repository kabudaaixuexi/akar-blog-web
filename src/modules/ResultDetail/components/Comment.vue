<template>
  <article class="result-detail-comment">
    <header>
      <span>全部评论（{{evals.length}}）</span>
      <el-button size="small" @click="handleWriteEval" :icon="Edit" type="primary" round plain>写评论</el-button>
    </header>
    <div :style="i.reply ? 'padding-left:40px' : ''" :key="key" v-for="(i, key) in evals">
      <div class="eval-head">
        <img :src="i.userPortrait" alt="">
        <div class="eval-head__other">
          <b>{{ i.userName }} <span v-if="false">作者</span> <span class="reply" v-if="i.reply">&nbsp;回复&nbsp;<u>{{i.reply}}</u>&nbsp;的评论</span></b>
          <p>{{ i.evalTime}}</p>
        </div>
      </div>
      <div class="eval-cont">
        {{i.evalContent}}
      </div>
      <div class="eval-option">
        <b @click="() => handleWriteEval(i)"><el-icon><Comment /></el-icon> 回复</b>
        <b v-if="userInfo.userName === i.userName" @click="() => handleDeleteEval(i)"><el-icon><DeleteFilled /></el-icon> 删除</b>
      </div>
    </div>
    <p class="result-detail-empty">没有更多评论了</p>
  </article>
</template>

<script lang="ts" setup>
import { onMounted, h } from "vue";
import Cookie from "js-cookie";
import Api from "@/api";
import Cookies from "js-cookie";
import { useRouter } from 'vue-router'
import { getTime , getUuiD } from '@/utils'
import { useState } from "@akar/vue-hooks";
import { ElMessage, ElMessageBox } from "element-plus";
import { Edit, Comment, DeleteFilled } from "@element-plus/icons-vue";

const props = defineProps<{
  eval: [],
  getEvals: () => {},
  getNoteInfo: () => {}
}>()
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
const [myEval, setMyEval] = useState('')
const [evals, setEvals] = useState([])

const handleDeleteEval = async (info) => {
  const noteInfo = props.getNoteInfo()
  let temExtData;
  if (!info.reply) {
    ElMessageBox.confirm('确定删除该条评论？（此评论的回复将被一并删除）', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }).then(async () => {
      temExtData = {
        ...noteInfo.extData,
        eval: evals.value.filter(i => (i.evalId !== info.evalId)),
      };
      await Api.adornNote({
        ...noteInfo,
        extData: temExtData,
      });
      setEvals(temExtData.eval);
      ElMessage.success('已删除该评论')
    })
    return
  }
  temExtData = {
    ...noteInfo.extData,
    eval: evals.value.filter(i => (i.id !== info.id)),
  };
  await Api.adornNote({
    ...noteInfo,
    extData: temExtData,
  });
  setEvals(temExtData.eval);
  ElMessage.success('已删除该评论')
}

const handleWriteEval = (info) => {
  if (!Object.getOwnPropertyNames(userInfo).length) {
    ElMessage.error("登录后才能进行点赞");
    return
  }
  ElMessageBox({
    title: '写下你的评论..',
    confirmButtonText: '发表',
    message: h('textarea', { oninput: (e) => setMyEval(e.target.value), style: 'font-family: serif;color: #333;font-size: 14px;padding:10px;width: 100%;border-color: #c0c4cc;border-radius: 4px;', rows:"5", }),
  }).then(async () => {
      const noteInfo = props.getNoteInfo()
      let temExtData;
      // 发表对文章的评论
      if (!info.evalId) {
        let newEval = evals.value
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
          ...noteInfo.extData,
          eval: newEval,
        };
      } else {
        let newEval = evals.value
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
          ...noteInfo.extData,
          eval: newEval,
        };
      }
      await Api.adornNote({
        ...noteInfo,
        extData: temExtData,
      });
      setEvals(filterEval(temExtData.eval));
      ElMessage.success('发表评价成功')
  })
}
const filterEval = (list = []) => {
  const newList = list
  .sort((x,y) => (y.evalId - x.evalId))
  console.log(newList,'cscasc');
  return newList
}
setTimeout(() => setEvals(filterEval(props.getEvals())), 1888)
</script>

<style lang="scss" scoped>
.result-detail-comment {
  margin: 0 20px;
  header {
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    span{
      padding-right: 20px;
    }
  }
  .eval-head {
    display: flex;
    align-items: center;
    padding: 12px 0;
    img {
      background-color: aqua;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 12px;
    }
    &__other {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      p {
        font-size: 12px;
        margin-top: 6px;
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
    padding-left: 48px;
  }
  .eval-option {
    padding: 12px 0 18px 48px;
    border-bottom: calc(1px / 2) solid #f1f1f1;
    display: flex;
    b {
      cursor: pointer;
      display: flex;
      font-size: 12px;
      margin-right: 14px;
      align-items: center;
      color: #666;
      width: 40px;
      font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
      justify-content: space-between;
    }
  }
  .result-detail-empty {
    display: grid;
    place-content: center;
    font-size: 12px;
    color: #999;
    padding-top: 16px;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
}
</style>
