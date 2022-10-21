<template>
  <el-carousel :class="`pop${pop} mb20`" height="137px" ref="myRef" :interval="10000" width="100%" >
    <img class="empty_this" src="../../assets/images/loading.gif" alt="">
    <el-carousel-item v-for="item in list" :key="item">
      <a target="_blank" :href="item.link">
        <img style="border-radius: 4px" :class="`pop${pop}`" :src="item.uri" :alt="item.expl">
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
const router = useRouter()
const [list, setList] = useState([])
const getWalkCharts = async () => {
  const { data: list } = await Api.getWalkCharts({})
  setList(list)
}
onMounted(() => {
  getWalkCharts()
});
</script>

<style lang="scss" scoped>
.pop16-9 {
  width: 100%;
  overflow: hidden;
}
.empty_this {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 400px;
}
// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #d3dce6;
// }
</style>
