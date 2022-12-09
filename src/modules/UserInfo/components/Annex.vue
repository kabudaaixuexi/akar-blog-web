<template>
  <section
    v-loading="false"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    class="annex-container"
  >
    <p class="ml12 mt12 b500">ta的附件 (点击预览)</p>
    <div class="annex-container__item mt12 flex br4" v-for="({url, name, type}, key) in annexList" :key="key" @click="download(url, name + '.' + type)">
      <figure class="ml12 mr6 flex"><img :src="iconSet.get(type) || url" :alt="name" /></figure>
      <figcaption class="flex">
        <span class="otw">{{name}}</span>
      </figcaption>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import Cookie from "js-cookie";
import Api from "@/api";
import { download } from '@/utils'
import { useRouter } from 'vue-router'
import { useState } from "@akar/vue-hooks";
import { ElMessage } from "element-plus";
const svg = `
  <svg t="1653073827880" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="32474" width="32" height="32"><path d="M511.999 89.638C282.053 89.638 95.035 273.4 89.763 502.08c4.884-199.52 156.598-359.646 343.044-359.646 189.526 0 343.169 165.46 343.169 369.566 0 43.738 35.456 79.193 79.193 79.193 43.738 0 79.193-35.455 79.193-79.193 0-233.264-189.097-422.362-422.363-422.362z m0 844.724c229.947 0 416.967-183.763 422.238-412.44-4.884 199.52-156.599 359.645-343.045 359.645-189.527 0-343.17-165.459-343.17-369.566 0-43.737-35.455-79.193-79.192-79.193S89.637 468.263 89.637 512c0 233.266 189.098 422.362 422.362 422.362z" p-id="32475" fill="#a0cfff"></path></svg>
`;
const router = useRouter()
const iconSet = new Map([
  ['pdf', require('../../../assets/images/pdf.jpeg')],
  ['pptx', require('../../../assets/images/pptx.jpeg')],
])
const [loading, setLoading] = useState(true);
const [annexList, setAnnexList] = useState([]);

// 获取收藏的图片
const getMyPackages = async () => {
  const { data } = await Api.getPackages({
    superior: '/_annex',
  });
  setAnnexList(data.map(i => {
    const a = i.split('/')
    const b = i.split('.')
    return {
      url: i,
      name: a[a.length -1].split('.')[0],
      type: b[b.length -1]
    }
  }));
};
onMounted(() => {
  getMyPackages()
});
</script>

<style lang="scss" scoped>
.annex-container {
  margin-top: 30px;
    width: 60%;
    font-size: 12px;
    background-color: rgb(247, 245, 241);
    border-radius: 2px;
    padding: 20px;
    &__item:hover{
      border:calc(1px / 2) solid #bebebc;
      background-color: rgb(242, 241, 241);
    }
    &__item {
      height: 50px;
      align-items: center;
      border:calc(1px / 2) solid #d5d6d6;
      cursor: pointer;
      font-family: 'Courier New', Courier, monospace;
      img {
        max-width: 40px;
        height: auto;
        width: auto;
        max-height: 40px;
      }
      figure {
        height: 100%;
        align-items: center;
        width: 40px;
      }
      figcaption {
        transform: scale(.9);
        width: calc(100% - 60px);
        justify-content: flex-start;
      }
    }
}
</style>
