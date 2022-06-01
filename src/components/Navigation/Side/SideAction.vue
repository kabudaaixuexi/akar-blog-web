<template>
  <div class="side-action-container">
    <ul class="action-list">
      <li
        v-for="item in entrances"
        :key="item"
        @click="router.push(item.path)"
        :class="`action-item ${route.path.includes(item.path) ? 'cur' : ''}`"
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
import { getEntrances } from './Actions.config'

const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
const router = useRouter()
const route = useRoute()

const [entrances, setEntrances] = useState(getEntrances( (userInfo && Object.getOwnPropertyNames(userInfo).length) ? 'user' : 'tourist'))
</script>
<style lang="scss" scoped>
.side-action-container {
  position: relative;
  .action-list {
    display: flex;
    white-space: nowrap;
    .action-item {
      transition: .3s;
      color: var(--xs-color-info-dark-2);
      padding: 0 12px;
      margin-right: 5px;
      cursor: pointer;
      display: flex;
      span {
        transition: .18s;
        display: flex;
        align-items: center;
      }
      span:nth-of-type(1) {
        transform: scale(0);
      }
      &:hover{
        background-color: var(--xs-color-primary-light-9);
        color: var(--xs-color-primary);
        span:nth-of-type(1) {
          transform: scale(1.6) translateX(90%);
        }
        span:nth-of-type(2) {
          transform: scale(0);
        }
      }
    }
    .cur {
        color: var(--xs-color-warning-dark-2);
    }
  }
}
</style>
