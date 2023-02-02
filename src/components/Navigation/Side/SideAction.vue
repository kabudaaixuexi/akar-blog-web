<template>
  <div class="side-action-container">
    <ul class="action-list">
      <li class="Color_Header action-list__tip">{{ !logined ? '登录解锁更多菜单～' : '' }}</li>
      <li
        v-for="item in entrances"
        :key="item"
        @click="() => item.path ? router.push(item.path) : ElMessage.error({
          message: '码码码码中...'
        })"
        :class="`Color_Header action-item ${route.path.includes(item.path) ? 'cur' : ''}`"
      >
      <span
          style="padding-right: 10px"
          v-html="
            `<svg t='1653024126146' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='14732' width='14' height='14'>
                ${item.svg}
              </svg>`
          "
        />
       <span>{{ item.explain }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useState } from '@akar/vue-hooks'
import { useRoute, useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { ElMessage } from 'element-plus'
import { getEntrances } from './Actions.config'

const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
const router = useRouter()
const route = useRoute()
const logined = (userInfo && Object.getOwnPropertyNames(userInfo).length)
const [entrances, setEntrances] = useState(getEntrances( logined ? 'user' : 'tourist'))

</script>
<style lang="scss" scoped>
.side-action-container {
  position: relative;
  .action-list {
    display: flex;
    white-space: nowrap;
    &__tip {
      font-size: 12px;
      font-family:Georgia, 'Times New Roman', Times, serif;
      transform: scale(.9) translateX(20px);
    }
    .action-item {
      transition: .3s;
      padding: 0 4px;
      margin-right: 5px;
      cursor: pointer;
      display: flex;
      font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      span {
        transition: .2s;
        display: flex;
        align-items: center;
        opacity: 1;
      }
      span:nth-of-type(1) {
        transform: scale(0);
        opacity: 0;
      }
      &:hover{
        color: var(--xs-color-primary);
        span:nth-of-type(1) {
          transform: scale(1.6) translateX(119%);
          opacity: 1;
        }
        span:nth-of-type(2) {
          transform: scale(0);
          opacity: 0;
        }
      }
    }
    .cur {
        color: var(--xs-color-warning-dark-2);
        transition: .18s;
    }
  }
}
</style>
