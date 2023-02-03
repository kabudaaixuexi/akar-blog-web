<template>
  <section
    v-loading="false"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    class="intorduce-container BgColor_Content"
  >
    <el-input
      :maxlength="100"
      type="textarea"
      v-model="message"
      placeholder="给ta留言，ta会以私信的形式收到你的留言，最多100个字哦"
    />
    <div style="display: flex; justify-content: flex-end">
      <el-button class="mt20 Color_Content" @click="handleSubmit" type="primary">发送留言</el-button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, inject } from "vue";
import { Socket } from "socket.io-client";
import Cookie from "js-cookie";
import Api from "@/api";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";
import { useState } from "@akar/vue-hooks";
import { ElMessage } from "element-plus";
import { getUuiD, getTime, createRandomId } from "@/utils";
const svg = `
  <svg t="1653073827880" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="32474" width="32" height="32"><path d="M511.999 89.638C282.053 89.638 95.035 273.4 89.763 502.08c4.884-199.52 156.598-359.646 343.044-359.646 189.526 0 343.169 165.46 343.169 369.566 0 43.738 35.456 79.193 79.193 79.193 43.738 0 79.193-35.455 79.193-79.193 0-233.264-189.097-422.362-422.363-422.362z m0 844.724c229.947 0 416.967-183.763 422.238-412.44-4.884 199.52-156.599 359.645-343.045 359.645-189.527 0-343.17-165.459-343.17-369.566 0-43.737-35.455-79.193-79.192-79.193S89.637 468.263 89.637 512c0 233.266 189.098 422.362 422.362 422.362z" p-id="32475" fill="#a0cfff"></path></svg>
`;
const router = useRouter();
const socket = inject("socket") as Socket;
const [loading, setLoading] = useState(true);
const [message, setMessage] = useState("");
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
const { state } = defineProps<{ state: any }>();

const handleSubmit = () => {
  if (!userInfo.userName) {
    ElMessage.error("请先登录才能给ta留言哦～");
    return;
  }
  if (userInfo.userName === state.value.userName) {
    ElMessage.error("不能给自己留言哦");
    return;
  }
  if (message.value) {
    const news = {
      formUid: new Date().getTime(), // id
      formUserId: userInfo.userName, //
      groupId: getUuiD(), //
      message: encodeURI(message.value), //
      msgType: 1,
      sendTime: getTime(),
      needFeedBack: false,
      sid: state.value.userName,
    };
    socket.emit("letter", news);
    setMessage('')
  } else {
    ElMessage.error("不能什么也不说哦");
  }
};

onMounted(() => {
  socket.on("letter", (payload) => {
    ElMessage.success("留言成功，可在私信处查看留言内容");
  });
  setTimeout(() => {
    setLoading(false);
  }, 1200);
});
onUnmounted(() => {
  socket.removeAllListeners('letter')
})
</script>

<style lang="scss" scoped>
.intorduce-container {
  margin-top: 30px;
  width: 60%;
  background-color: rgb(247, 245, 241);
  border-radius: 2px;
  padding: 20px;
  .intorduce-container-card {
    font-size: 12px;
    background-color: #bad2d8;
    opacity: 0.9;
    font-family: Georgia, "Times New Roman", Times, serif;
  }
  &:deep() {
    .el-textarea__inner {
      height: 100px;
      font-size: 12px;
      font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    }
  }
}
</style>
