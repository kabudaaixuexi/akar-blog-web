<template>
  <ul class="menu-container hidden" id="menu">
    <li class="menuItem" v-for="(item, i) in menus" :key="i" :data-key="item.key">
      <el-upload
        v-if="item.key === 1"
        class="upload-demo"
        :action="getUploadUrl()"
        :on-success="uploadSuccess"
        :multiple="false"
        :headers="{
          'Authorization': 'Bearer ' + Cookies.get('token')
        }"
        multiple
        :limit="1"
        :show-file-list="false"
      >
        <span
          style="padding-right: 6px"
          v-html="
            `<svg t='1653024126146' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='14732' width='16' height='16'>
                ${item.svg}
              </svg>`
          "
        />
        <span>上传文件</span>
      </el-upload>
      <figcaption v-else>
        <span
          style="padding-right: 6px"
          v-html="
            `<svg t='1653024126146' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='14732' width='16' height='16'>
                ${item.svg}
              </svg>`
          "
        />
        <span>{{ item.text }}</span>
      </figcaption>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useState } from "@akar/vue-hooks";
import Cookies from "js-cookie";
import { initialMenu, portfolioMenu, packageMenu } from "../data/config";
import { ElMessage } from "element-plus";

const props = defineProps<{
  handleClick: Function;
  getSuperior: Function;
  uploadSuccess: Function
}>();
const [menus, setMenus] = useState([]);

const getUploadUrl = () => `${import.meta.env.VITE_BASE_API}/upload/setPackages?superior=${props.getSuperior()?.slice(1, props.getSuperior().length)}`
const creatMenus = (el: Element | any) => {
  el.addEventListener("contextmenu", (e) => {
    /** 初始化右键菜单栏 */
    const type = e.target.dataset.type;
    const path = e.target.dataset.path;
    if (path && (path.split('/').pop() === '_article' || path.split('/').pop() === '_section')) {
      path.split('/').pop() === '_article' && ElMessage.warning('该目录记录您创作过程中产生的图片，不允许操作！！')
      path.split('/').pop() === '_section' && ElMessage.warning('该目录记录您私信过程中产生的图片，不允许操作！！')
      setMenus([])
    } else if(path && (path.split('/')[path.split('/').length -2] === '_article' || path.split('/')[path.split('/').length -2] === '_section')) {
      path.split('/')[path.split('/').length -2] === '_article' && ElMessage.warning('该文件属于您创作过程中产生的图片，不允许修改！！')
      path.split('/')[path.split('/').length -2] === '_section' && ElMessage.warning('该文件属于您私信过程中产生的图片，不允许修改！！')
      setMenus([])
    } else {
      type == "package" && setMenus(packageMenu); // 文件
      type == "portfolio" && setMenus(portfolioMenu); // 文件夹
      type == "article" && setMenus(initialMenu);
    }
    e.preventDefault();
    let menu: any = document.querySelector("#menu");
    menu.style.top = `${e.clientY}px`;
    menu.style.left = `${e.clientX}px`;
    menu.classList.remove("hidden");
    // 添加点击事件
    setTimeout(() => {
      let menuList: any = document.getElementsByClassName("menuItem");
      Array.from(menuList).forEach((el: any) => {
        el.onclick = (e) => {
          props.handleClick(el.dataset.key, path);
        };
      });
    }, 0);
  });
  el.addEventListener("click", () => {
    let menu: any = document.querySelector("#menu");
    menu.classList.add("hidden");
  });
};

onMounted(() => {
  creatMenus(document.querySelector("#storage-content"));
});
</script>

<style lang="scss" scoped>
.menu-container {
  position: fixed;
  background-color: rgb(220, 229, 228);
  box-shadow: 0 0 5px 5px rgba(97, 95, 95, 0.1);
  border-radius: 12px;
  z-index: 2;
  li{
    cursor: pointer;
    border-radius: 4px;
    padding: 6px;
    margin: 0 6px;
    display: flex;
    span {
      display: flex;
      align-items: center;
    }
    figcaption {
      display: flex;
      align-items: center;
    }
    &:hover{
      transition: .23s;
      background-color: var(--xs-color-warning-light-9);
    }
    &:nth-of-type(1) {
      margin-top: 12px;
    }
    &:last-of-type {
      margin-bottom: 12px;
    }
  }
}
.hidden {
  display: none;
}
</style>
