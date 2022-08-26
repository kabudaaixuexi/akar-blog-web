<template>
  <section
    v-loading="false"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    class="intorduce-container"
  >
    <p class="ml12 mt12 b500">了解更多可点击下方链接</p>
    <div class="intorduce-container-link" v-for="(item, key) in state" :key="key">
        <a target="_blank" :href="item.value">{{item.label}}</a>
    </div>
    <div class="c666 ml12 mt20 mb12" v-if="!state.length"> ta还没有设置任何外部链接</div>
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
const [loading, setLoading] = useState(true);

const { state } = defineProps<{ state: any }>();


onMounted(() => {
  setTimeout(() => {
    setLoading(false)
  }, 1200);
});
</script>

<style lang="scss" scoped>
.intorduce-container {
    margin-top: 24px;
    width: 60%;
    opacity: .9;
    background-color: rgb(247, 245, 241);
    border-radius: 2px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    padding: 12px 20px;
    font-size: 12px;
    .intorduce-container-link {
      margin: 12px;
      a {
        color: #333;
        text-decoration:underline;
      }
    }
}
</style>
