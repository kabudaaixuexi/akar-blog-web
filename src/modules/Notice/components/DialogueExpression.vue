<template>
  <el-carousel trigger="click" height="300px" indicator-position="outside" :autoplay="false" arrow="never" @change="createFocus">
      <el-carousel-item>
        <div class="DialogueExpression">
          <span v-for="item in fontEmgs" :key="item" @click="insertHtml(item)" class="fontemg" v-html="item"></span>
        </div>
      </el-carousel-item>
      <el-carousel-item>
        <div class="DialogueExpressionImg">
          <img class="img" @click="insertImg(item)" v-for="item in emgList" :key="item" :src="item" alt="">
          <el-empty v-if="!emgList || !emgList.length" :image-size="100" description="您可在我的文件处新建 _memes 目录来管理您额外的表情包" />
        </div>
      </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { fontEmgs } from '../data/config'
import { ElMessage, ElCarousel } from "element-plus";
import Api from '@/api'
import { useState } from '@akar/vue-hooks';

const [emgList, setEmgList] = useState([])
// 聚焦
const createFocus = () => {
  setTimeout(() => (document.querySelector(".xs-editor-container") as any).focus())
}
const insertImg = (src) => {
    if (window.getSelection) {
        var sel:any = window.getSelection();
        var range = sel.getRangeAt(0);
        var img = new Image();
        range.deleteContents()
        img.src=src;
        range.insertNode(img);
        range.collapse(false);//对于IE来说，参数不可省略
        createFocus()
    }
}
const insertHtml = (html) => {
    if (window.getSelection) {
        var sel:any = window.getSelection();
        var range = sel.getRangeAt(0);
        var span = document.createElement('span')
        span.style.padding='0 2px'
        range.deleteContents()
        span.innerHTML=html;
        range.insertNode(span);
        range.collapse(false);//对于IE来说，参数不可省略
        createFocus()
    }
}
// 获取收藏的图片
const getMyPackages = async () => {
  const { data } = await Api.getPackages({
    superior: '/_memes',
  });
  setEmgList(data);
};
onMounted(() => {
  getMyPackages();
});
</script>

<style lang="scss" scoped>
.DialogueExpression {
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  user-select: none;
  .fontemg {
    font-size: 18px;
    border-radius: 6px;
    padding: 6px 8px;
    display: inline-block;
    cursor: pointer;
    &:hover {
      transition: .3s;
      background-color: var(--xs-color-primary-light-8);
    }
  }
  .el-empty {
    width: 100%;
    :deep()p {
      font-size: 12px;
    }
  }

}
.DialogueExpressionImg {
  overflow-y: auto;
  height: 100%;
  user-select: none;
  .img {
    float: left;
    max-width: 100px;
    height: 80px;
    width: auto;
    padding: 8px;
    margin: 8px;
    border-radius: 6px;
    &:hover {
      transition: .32s;
      background-color: var(--xs-color-primary-light-8);
    }
  }
}
</style>
