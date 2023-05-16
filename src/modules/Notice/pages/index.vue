<template>
  <LayoutArea
    :showFooter="false"
    :sideLeftWidth="136"
    :contentWidth="600"
    :contentBottom="12"
    :contentColor="'transparent'"
  >
    <template #top>
      <NavigationNavBar :fixed="false">
        <NavigationSideLogo />
        <div style="margin-left: 18px">
          <SearchCorporation @select="handleSelectSearch" :list="list" :path="'resultEdit'" />
        </div>
      </NavigationNavBar>
    </template>

    <template #sideLeft>
      <ul class="notice-option">
        <li
          class="notice-option-item"
          @click="setCurrentComponent(item)"
          v-for="(item, i) in components"
          :key="i"
        >
          <figcaption
            v-html="
              `<svg t='1653024126146' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='14732' width='28' height='28'>
                ${item.svg}
              </svg>`
            "
          ></figcaption>
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </template>

    <template #content>
      <component :is="currentComponent.tabComp"></component>
    </template>

  </LayoutArea>
</template>

<script lang="ts" setup>
import { markRaw, ref, reactive, onMounted, inject } from "vue";

import NavigationSideLogo from "@/components/Navigation/Side/SideLogo.vue";
import NavigationNavBar from "@/components/Navigation/NavBar.vue";
// 动态组件
import DialogUe from "../components/Dialogue.vue";
import RoutineNot from "../components/RoutineNot.vue";
import SystemNot from "../components/SystemNot.vue";

import Api from "@/api";
import Cookies from "js-cookie";
import { useState } from "@akar/vue-hooks";
import Store from "@/store";

type tabType = {
  name: string;
  tabComp: any;
};
type Comp = Pick<tabType, "tabComp">;
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");

const [components, setComponents] = useState([
  {
    name: "我的私信",
    svg: `<path d="M512 0C229.456314 0 0 227.558902 0 510.102588c0 282.553725 229.456314 510.102588 512 510.102588 282.553725 0 510.102588-227.548863 510.102588-510.092549C1022.102588 227.548863 794.553725 0 512.010039 0z" fill="#5E96FF" p-id="14119"></path><path d="M730.101961 271.058824h-436.203922C253.450039 271.058824 220.862745 303.87702 220.862745 344.596078v303.244549c0 40.729098 32.587294 73.547294 73.035294 73.547295H559.585882l22.40753 54.201725a28.260392 28.260392 0 0 0 37.24549 15.22949l3.493647-1.756862 85.835294-67.674353h21.544157c40.156863-0.301176 72.744157-33.109333 73.035294-73.547295V344.596078A73.527216 73.527216 0 0 0 730.101961 271.058824zM603.226353 566.392471c0 17.287529-13.964549 31.352471-30.85051 31.35247h-240.941176c-17.167059 0-30.840471-14.064941-30.840471-31.35247 0-17.287529 13.964549-31.352471 30.840471-31.352471h240.660078c17.167059 0.301176 31.131608 14.064941 31.131608 31.352471z m89.047843-110.461491H331.434667a31.061333 31.061333 0 0 1-29.967059-32.225882 31.221961 31.221961 0 0 1 29.967059-30.177882h360.839529c17.167059 0 31.131608 14.064941 31.131608 31.35247a31.221961 31.221961 0 0 1-31.131608 31.051294z" fill="#FFFFFF" p-id="14120"></path>`,
    tabComp: markRaw(DialogUe),
  },
  {
    name: "与我有关",
    svg: `<path d="M731.31 498.293c17.134-82.241 23.986-137.069 27.413-164.483-3.427-30.841-20.561-47.974-51.401-51.401-34.268 0-54.828 13.707-58.254 44.547l-3.427 23.986c-41.12-54.828-92.522-82.241-154.202-82.241-140.495 6.854-239.871 119.935-239.871 301.551 3.427 130.215 61.681 198.749 171.335 205.603 54.828 3.427 99.375-17.134 140.495-58.254h3.427c3.427 37.694 27.413 58.254 71.961 58.254 191.897-13.707 318.685-143.922 308.405-311.831-6.854-71.961-30.841-140.495-68.534-198.749 0 0 0-3.427-3.427-3.427-78.815-116.509-212.457-191.897-363.232-191.897-239.871 0-435.194 198.749-435.194 442.047 0 243.297 198.749 442.047 442.047 442.047 123.362 0 236.444-51.401 315.258-133.643-6.854-17.134-20.561-23.986-37.694-27.413-10.279 0-27.413 6.854-47.974 20.561-65.108 37.694-137.069 58.254-222.737 58.254-226.163-17.134-352.953-133.643-352.953-352.953 3.427-215.883 130.215-335.819 342.671-356.38 171.335-10.279 322.112 89.094 325.539 298.125-6.854 116.509-41.12 178.19-106.228 191.897-20.561 0-27.413-6.854-23.986-23.986 0-17.134 6.854-58.254 20.561-130.215zM481.159 638.788c-61.681 0-92.522-30.841-92.522-95.948 6.854-78.815 47.974-123.362 119.935-130.215 61.681 3.427 92.522 34.268 95.948 95.948-3.427 82.241-47.974 126.788-123.362 130.215z" p-id="15858" fill="#578DF7"></path>`,
    tabComp: markRaw(RoutineNot),
  },
  {
    name: "系统通知",
    svg: `<path d="M513.27488 8.61696c-278.71744 0-504.65792 225.9456-504.65792 504.66304 0 278.71744 225.9456 504.65792 504.65792 504.65792 278.72256 0 504.66304-225.9456 504.66304-504.65792 0-278.71744-225.94048-504.66304-504.66304-504.66304z m46.42816 289.83808v430.57152s0.08192 12.80512-11.22816 30.5152c-7.37792 11.56608-14.72512 18.62656-21.98016 20.71552-9.8816 2.8416-41.1136 0-41.1136 0l-127.2832-127.21152-98.5088 0.08192s-11.19232-2.11968-19.84512-12.94848c-7.82848-9.7792-10.19904-19.1488-10.19904-19.1488V408.50944s-0.02048-10.26048 8.064-18.81088c12.33408-13.04576 24.192-13.44 24.192-13.44h92.9792l130.92864-127.13472s32.03072-2.77504 42.2144 0c7.41376 2.02752 13.91104 8.21248 22.2976 21.18144 11.08992 17.16224 9.48224 28.14976 9.48224 28.14976z m91.76064 332.47744a35.61472 35.61472 0 0 1-25.21088-10.44992 35.61984 35.61984 0 0 1 0-50.46784 78.40256 78.40256 0 0 0 22.7328-55.30112 78.44864 78.44864 0 0 0-22.7328-55.28064 35.6096 35.6096 0 0 1 0-50.46784 35.50208 35.50208 0 0 1 50.42176 0 149.53984 149.53984 0 0 1 43.55584 105.74848 149.51424 149.51424 0 0 1-43.55584 105.76384 35.6096 35.6096 0 0 1-25.21088 10.45504z m103.13216 80.72704c-13.64992 14.80192-35.7632 14.80192-49.28 0-13.696-14.62784-13.696-38.528 0-53.31968 33.8944-36.83328 55.12704-87.51616 55.12704-143.63136 0-56.09984-21.07904-106.78784-54.9888-143.62624-13.66016-14.78144-13.66016-38.67136 0-53.31456l0.0256-0.01536c13.6448-14.80704 35.59424-14.80704 49.28 0l0.28672 0.30208c46.43328 50.3808 75.0592 119.89504 75.0592 196.64384-0.00512 76.89216-28.92288 146.5344-75.50976 196.96128z" p-id="16882" fill="#578DF7"></path>`,
    tabComp: markRaw(SystemNot),
  },
]);
const [currentComponent, setCurrentComponent] = useState(components.value[0]);

onMounted(() => {});
</script>

<style lang="scss" scoped>
.notice-option {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 12px;
  padding: 12px;
  margin-top: 100%;
  .notice-option-item {
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
    transition: all 0.22s;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    font-weight: 500;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.18);
    span {
      transition: all 0.3s;
      margin-left: 36px;
      color: var(--el-color-primary);
    }
    figcaption {
      transition: all 0.3s;
      margin-left: 10px;
    }
    &:hover {
      figcaption {
        margin-left: -48px;
      }
      border-radius: 10px;
      width: 88px;
      background-color: var(--xs-color-primary-light-5);
    }
  }
}
</style>
