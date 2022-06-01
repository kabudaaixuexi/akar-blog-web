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

    <template #content>
      <section class="storage-content" id="storage-content">
        <header class="storage-content__header">
          <span style="padding-right: 24px; line-height: 60%" @click="upperLevel">
            <svg
              t="1653725158648"
              class="icon"
              viewBox="0 0 1041 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2171"
              width="20"
              height="20"
            >
              <path
                d="M831.747371 420.007843c60.838623 36.268018 135.484717 134.100184 166.540014 251.862261 31.060413 117.76924 25.910113 223.224014 25.910113 223.224014s-40.209794-64.941058-56.512085-87.710644C951.382099 784.621051 882.686531 699.801247 776.058025 650.641617c-106.627483-49.158606-284.857746-40.404222-284.857746-40.404222l0 204.706265L0 467.010343l491.200278-347.934341 0 206.589149c0 0 117.998461 8.881274 179.679265 21.654182C774.766612 368.833323 831.747371 420.007843 831.747371 420.007843L831.747371 420.007843zM831.747371 420.007843"
                p-id="2172"
                fill="#8a8a8a"
              ></path>
            </svg>
          </span>
          当前目录： {{ superior || "/ " }}
        </header>
        <article class="storage-content__con" data-type="article">
          <figure
            v-for="(port, i) in portfolioList"
            :key="i"
            @click="openPortfolio(port)"
            data-type="portfolio"
            :data-path="port"
          >
            <svg
              data-type="portfolio"
              :data-path="port"
              t="1653725603134"
              class="icon"
              viewBox="0 0 1228 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="9165"
              width="48"
              height="48"
            >
              <path
                d="M1196.987733 212.5824v540.0576c0 39.594667-34.474667 71.3728-76.765866 71.3728H323.242667c-51.780267 0-88.746667-46.762667-73.250134-92.808533l126.737067-375.808H70.417067C31.675733 355.362133 0 326.4512 0 291.089067V98.372267C0 63.044267 31.675733 34.0992 70.417067 34.0992h378.811733c26.7264 0 51.029333 13.9264 63.010133 35.703467l39.048534 71.406933H1120.256c42.257067 0 76.8 32.119467 76.8 71.3728"
                fill="#5398DF"
                p-id="9166"
              ></path>
              <path
                d="M1128.721067 997.853867H68.266667a68.266667 68.266667 0 0 1-68.266667-68.266667V280.3712a68.266667 68.266667 0 0 1 68.266667-68.266667h1060.4544a68.266667 68.266667 0 0 1 68.266666 68.266667V929.5872a68.266667 68.266667 0 0 1-68.266666 68.266667"
                fill="#85BCFF"
                p-id="9167"
                data-type="portfolio"
                :data-path="port"
              ></path>
            </svg>
            <figcaption data-type="portfolio" :data-path="port">
              {{ port.substring(port.lastIndexOf("/") + 1, port.length) }}
            </figcaption>
          </figure>
          <figure
            v-for="(pack, i) in packageList"
            @click="openPackage(pack)"
            :key="i"
            data-type="package"
            :data-path="pack"
          >
            <img
              :src="`${pack}?${new Date().getTime()}`"
              data-type="package"
              :data-path="pack"
            />
            <figcaption data-type="package" :data-path="pack">
              {{ pack.substring(pack.lastIndexOf("/") + 1, pack.length) }}
            </figcaption>
          </figure>
        </article>
        <RightMenu :handleClick="handleClick" :getSuperior="getSuperior" :uploadSuccess="uploadSuccess" />
      </section>
    </template>
  </LayoutArea>
</template>

<script lang="ts" setup>
import { markRaw, ref, reactive, onMounted, inject } from "vue";

import NavigationSideLogo from "@/components/Navigation/Side/SideLogo.vue";
import NavigationNavBar from "@/components/Navigation/NavBar.vue";
import RightMenu from "../components/RightMenu.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import Api from "@/api";
import Cookies from "js-cookie";
import { useState } from "@akar/vue-hooks";
import Store from "@/store";
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
const [superior, setSuperior] = useState("");
const getSuperior = () => { return superior.value }
const [packageList, setPackageList] = useState([]);
const [portfolioList, setPortfolioList] = useState([]);
// 返回上一级
const upperLevel = () => {
  const tem = superior.value.split("/");
  tem.pop();
  if (!tem.length) {
    ElMessage({
      message: "已经处于根目录位置",
      type: "warning",
    });
    return;
  }
  setSuperior(tem.join("/"));
  getPackages();
  getPortfolio();
};
//打开目录
const openPortfolio = (e: any) => {
  setSuperior(e.split(userInfo.userName)[1]);
  getPackages();
  getPortfolio();
};
const openPackage = (e: any) => {
  window.open(e);
};
// 新增文件夹
const setPortfolio = () => {
  ElMessageBox.prompt("请输入要新增的文件夹名称", "", {
    confirmButtonText: "确定",
    inputPattern:
      /^.{1,20}$/,
    inputErrorMessage: '名称不能为空，最多20个字符',
    cancelButtonText: "取消",
    draggable: true,
  }).then(async ({ value }) => {
     if (value.indexOf("/") !== -1 ) {
      ElMessage.error(`文件夹名称中不能含有 "/" 字符`)
      return
    }
    const { data } = await Api.setPortfolio({
      superior: `${superior.value ? `${superior.value.substr(1)}/${value}` : `${value}`}`,
    });
    setPortfolioList([...portfolioList.value, data]);
  });
};
// 文件夹重命名
const renamePortfolio = (v) => {
  ElMessageBox.prompt("请输入新的名称", "", {
    confirmButtonText: "确定",
    inputValue: v.split('/').pop(),
    inputPattern:
      /((?!hede).)*/,
    inputErrorMessage: '名称不能为空，最多20个字符',
    cancelButtonText: "取消",
    draggable: true,
  }).then(async ({ value }) => {
    if (value.indexOf("/") !== -1 ) {
      ElMessage.error(`文件夹名称中不能含有 "/" 字符`)
      return
    }
    const { data } = await Api.renamePortfolio({
      superior: `${
        superior.value
          ? `${superior.value}/${v.substring(v.lastIndexOf("/") + 1, v.length)}`
          : `${v.substring(v.lastIndexOf("/") + 1, v.length)}`
      }`,
      name: value,
    });
    getPortfolio();
    ElMessage({
      message: "文件夹重命名成功",
      type: "success",
    });
  });
};
// 删除文件夹
const delPortfolio = async (v) => {
  await Api.delPortfolio({
    superior: `${
      superior.value
        ? `${superior.value}/${v.substring(v.lastIndexOf("/") + 1, v.length)}`
        : `${v.substring(v.lastIndexOf("/") + 1, v.length)}`
    }`,
  });
  getPortfolio();
  ElMessage({
    message: "删除目录成功",
    type: "success",
  });
};
// 文件重命名
const renamePackage = (v) => {
  const houzhui = v.split('/').pop().split('.')[1]
  ElMessageBox.prompt("请输入新的名称", "", {
    confirmButtonText: "确定",
    inputValue: v.split('/').pop(),
    inputPattern:
      /^.{1,20}$/,
    inputErrorMessage: '名称不能为空，最多20个字符',
    cancelButtonText: "取消",
    draggable: true,
  }).then(async ({ value }) => {
     if (value.indexOf("/") !== -1 ) {
      ElMessage.error(`文件名称中不能含有 "/" 字符`)
      return
    }
    const { data } = await Api.renamePackage({
      superior: `${
        superior.value
          ? `${superior.value}/${v.substring(v.lastIndexOf("/") + 1, v.length)}`
          : `${v.substring(v.lastIndexOf("/") + 1, v.length)}`
      }`,
      name: value.split('.')[1] || !houzhui ? value : value + '.' + houzhui,
    });
    getPackages();
    ElMessage({
      message: "文件重命名成功",
      type: "success",
    });
  });
}
// 删除文件
const delPackage = async (v) => {
  await Api.delPackages({
    superior: `${
      superior.value
        ? `${superior.value}/${v.substring(v.lastIndexOf("/") + 1, v.length)}`
        : `${v.substring(v.lastIndexOf("/") + 1, v.length)}`
    }`,
  });
  getPackages();
  ElMessage({
    message: "删除文件成功",
    type: "success",
  });
};
// 获取文件夹
const getPortfolio = async () => {
  const { data } = await Api.getPortfolio({
    superior: superior.value,
  });
  setPortfolioList(data);
};
// 获取文件
const getPackages = async () => {
  const { data } = await Api.getPackages({
    superior: superior.value,
  });
  setPackageList(data);
};
// 右键点击
const handleClick = async (e, v) => {
  switch (e) {
    case "2":
      setPortfolio();
      break;
    case "3":
      delPortfolio(v);
      break;
    case "4":
      renamePortfolio(v);
      break;
    case '5':
      openPackage(v)
      break;
    case '6':
      delPackage(v)
      break;
    case '7':
      renamePackage(v)
      break;
  }
};
const uploadSuccess = (response: any) => {
  setPackageList([...packageList.value, ...response.data]);
};
//
onMounted(() => {
  getPackages();
  getPortfolio();
});
</script>

<style lang="scss" scoped>
.storage-content {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: rgb(228, 236, 236);
  display: flex;
  flex-direction: column;
  &__header {
    display: flex;
    align-content: flex-start;
    align-items: center;
    padding: 12px 24px;
    font-family: "Times New Roman", Times, serif;
    font-weight: 500;
    border-bottom: 0.5px solid rgb(184, 179, 179);
  }
  &__con {
    flex: 1;
    padding: 12px;
    overflow-y: auto;
    figure {
      float: left;
      width: 100px;
      margin: 12px 6px;
      padding: 12px 0;
      display: flex;
      flex-direction: column;
      height: max-content;
      align-items: center;
      justify-content: center;
      font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      border-radius: 6px;
      color: #666;
      position: relative;
      cursor: pointer;
      svg {
        width: 66px;
        margin-bottom: 10px;
        height: auto;
      }
      img {
        max-height: 66px;
        min-height: 66px;
        width: auto;
        margin-bottom: 10px;
        height: auto;
        &:after{
            content: "";
            display: inline-block;
            position: absolute;
            z-index: 2;
            top: 7%;
            transform: scale(.84, .92) translateX(-50%);
            left: 44%;
            width: 66px;
            height: 66px;
            background-image: url('@/assets/svg/weizhi.svg');
            background-repeat: no-repeat;
            background-size: 100% ;
        }
      }
      &:hover {
        transition: 0.23s;
        color: #000;
        background-color: rgb(226, 223, 223);
      }
      figcaption {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100px;
        padding: 0 6px;
      }
    }
  }
}
</style>
