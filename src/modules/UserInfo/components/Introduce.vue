<template>
  <section
    v-loading="loading"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    class="intorduce-container BgColor_Content"
  >
    <el-card v-if="state.school" class="intorduce-container-card">
      <span>毕业院校：</span>
      <span>{{state.school}}</span>
    </el-card>
    <el-card v-if="state.major" class="intorduce-container-card mt20">
      <span>所学专业：</span>
      <span>{{state.major}}</span>
    </el-card>
    <el-card v-if="state.residence" class="intorduce-container-card mt20">
      <span>出生地：</span>
      <span>{{state.residence}}</span>
    </el-card>
    <el-card v-if="state.workyears" class="intorduce-container-card mt20">
      <span>工作年限：</span>
      <span>{{state.workyears}}</span>
    </el-card>

  </section>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import Cookie from "js-cookie";
import Api from "@/api";
import { useRouter } from 'vue-router'
import { useState } from "@akar/vue-hooks";
import { ElMessage } from "element-plus";
const svg = `
  <svg t="1653073827880" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="32474" width="32" height="32"><path d="M511.999 89.638C282.053 89.638 95.035 273.4 89.763 502.08c4.884-199.52 156.598-359.646 343.044-359.646 189.526 0 343.169 165.46 343.169 369.566 0 43.738 35.456 79.193 79.193 79.193 43.738 0 79.193-35.455 79.193-79.193 0-233.264-189.097-422.362-422.363-422.362z m0 844.724c229.947 0 416.967-183.763 422.238-412.44-4.884 199.52-156.599 359.645-343.045 359.645-189.527 0-343.17-165.459-343.17-369.566 0-43.737-35.455-79.193-79.192-79.193S89.637 468.263 89.637 512c0 233.266 189.098 422.362 422.362 422.362z" p-id="32475" fill="#a0cfff"></path></svg>
`;
const router = useRouter()

const [loading, setLoading] = useState(false);

const props = defineProps<{ state: any }>();
const state = JSON.parse(props.state || '{}')

onMounted(() => {
  setTimeout(() => {
    setLoading(false)
  }, 1200);
});
</script>

<style lang="scss" scoped>
.intorduce-container {
  margin-top: 30px;
    width: 60%;
    background-color: rgb(247, 245, 241);
    border-radius: 2px;
    padding: 20px;
    .intorduce-container-card {
      font-size: 12px;
      background-color: #bad2d8;
      opacity: .9;
      font-family:Georgia, 'Times New Roman', Times, serif;
    }
}
</style>
