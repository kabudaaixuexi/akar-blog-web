<template>
  <el-config-provider
    :test="111"
  >
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import { inject, onMounted } from 'vue'
import { Socket } from 'socket.io-client';
const socket = inject('socket') as Socket;

/**
 * 初始化 - 房间/模块
 * 加入文章消息通知模块 // essay
 * 加入聊天消息通知模块 // letter
 */
const initSocketIo = () => {
  socket.onAny((eventName, payload) => console.dir(eventName, payload));
  socket.on('joinRoomSuccess', (payload) => console.log(payload));
  socket.emit('joinRoom', 'essay');
  socket.emit('joinRoom', 'letter');
}
onMounted(() => {
  initSocketIo()
});
</script>

<style lang="scss">
@use '@/styles/index.scss';
@use '@/libs/driver.min.css'
</style>
