<template>
  <div class="side-action-container">
    <ul class="action-list">
      <li
        v-for="item in entrances"
        :key="item"
        @click="router.push(item.path)"
        :class="`action-item ${route.path.includes(item.path) ? 'cur' : ''}`"
      >
       {{ item.explain }}
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
      &:hover{
        background-color: var(--xs-color-primary-light-9);
        color: var(--xs-color-primary);
      }
    }
    .cur {
        color: var(--xs-color-warning-dark-2);
    }
  }
}
</style>
