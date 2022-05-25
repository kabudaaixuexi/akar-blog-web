<template>
  <LayoutArea :showFooter="false" :sideLeftWidth="136" :contentWidth="600" :contentBottom="12" :contentColor="'transparent'">
    <template #top>
      <NavigationNavBar :fixed="false">
        <NavigationSideLogo />
        <div style="margin-left: 18px">
          <SearchCorporation @select="handleSelectSearch" :list="list" :path="'resultEdit'"/>
        </div>
      </NavigationNavBar>
    </template>

    <template #sideLeft>
<ul class="storage-option">
        <li class="storage-option-item" @click="setCurrentComponent(item)" v-for="(item, i) in components" :key="i">
          <figcaption v-html="`<svg t='1653024126146' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='14732' width='28' height='28'>
                ${item.svg}
              </svg>`">
          </figcaption>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </template>

    <template #content>
      1
    </template>

  </LayoutArea>
</template>

<script lang="ts" setup>
import { markRaw, ref, reactive, onMounted, inject } from "vue";

import NavigationSideLogo from "@/components/Navigation/Side/SideLogo.vue";
import NavigationNavBar from "@/components/Navigation/NavBar.vue";

import Api from "@/api";
import Cookies from "js-cookie";
import { useState } from "@akar/vue-hooks";
import Store from "@/store";
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");


onMounted(() => {
});
</script>

<style lang="scss" scoped>
.storage-option {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 12px;
  padding: 12px;
  margin-top: 100%;
  .storage-option-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 48px;
    height: 48px;
    margin: 12px 0;
    border-radius: 50%;
    background-color: var(--xs-color-primary-light-7);
    white-space: nowrap;
    overflow: hidden;
    transition: all .22s;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 500;
    box-shadow: 0 1px 4px rgba(0,21,41,.18);
    span {
      transition: all .3s;
      margin-left: 36px;
      color: var(--el-color-primary);
    }
    figcaption {
      transition: all .3s;
      margin-left:10px;
    }
    &:hover {
      figcaption {
        margin-left: -48px;
      }
      border-radius: 10px;
      width: 88px;
      background-color: var(    --xs-color-primary-light-5);
    }
  }
}
</style>
