<template>
  <el-carousel :class="`pop${pop} mb20`" height="100px" ref="myRef" :interval="4000" width="100%" >
    <el-carousel-item v-for="item in list" :key="item">
      <a :href="item.link">
        <img :class="`pop${pop}`" :src="item.url" :alt="item.alt">
      </a>
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import Api from "@/api";
import { useRouter } from 'vue-router'
import { useState } from '@akar/vue-hooks';
const { pop } = defineProps<{
  pop: string
 }>();
 const myRef = ref<HTMLElement>();
const router = useRouter()

const [list, setList] = useState([
  {
    url: 'https://www.w3cplus.com/sites/default/files/blogs/2017/1707/Aspect_Ratios_and_Resolutions.svg',
    link: '',
    alt: ''
  }
])

onMounted(() => {
  console.log('列表的高度是：', myRef.value?.clientHeight)
});
</script>

<style lang="scss" scoped>
.pop16-9 {
  width: 100%;
}
// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #d3dce6;
// }
</style>
