<template>
  <router-link :to="`/e98f/${dataset.noteid}/ov`">
    <article @click="changeSkim" class="common-item-container">
      <h4 style="margin-bottom: 12px">{{dataset.subtitle || '无文章标题'}}</h4>
      <div class="common-item-content">
        <img v-if="dataset.cover" class="common-item-content__img" :src="dataset.cover" alt="">
        <div v-else class="common-item-content__img" />
        <figure>
          <div class="common-item-content-text">
            {{getVal(dataset.vNode) || "空内容"}}
          </div>
          <div class="common-item-content-options">
            {{dataset.uid}}
            <span>
              <svg t="1652958956766" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10978" width="14" height="14"><path d="M948.4 407.2c-29.2-35.5-76.9-35.5-92.6-35.5H730c10.2-55.2 18.9-119.4 0.2-187.1-12.8-46.6-36.3-79.7-72-101.1-18.7-11.2-38.1-16.9-57.8-16.9-51.8 0-90.6 38.4-96.4 95.7-2.2 21.4-4.2 41.7-9.3 59.1-19 63.9-65.4 112.7-108.3 151.8-16 14.4-33.1 40.2-33.3 69.2-0.6 77.6-0.7 155.5-0.7 235.1l-0.1 141.4c-0.2 47.3 25 85.4 67 101.7 22.2 9 45.7 14 70.1 14.7 38.8 0.5 77.8 0.5 114.3 0.5h56.9c37.2 0 74.4 0 111.8 0.4h1.2c43.5 0 77.7-21.7 93.9-59.5l4.8-11.1c11.3-26 22.9-52.9 30.1-82.8 22-90.9 44.9-188.2 63.4-283.8 7.4-37.9 1.6-68.8-17.4-91.8zM216.1 374.5h-11.9c-56.2 0-101.9 45.7-101.9 101.9v348.4c0 56.2 45.7 101.9 101.9 101.9h11.9c56.2 0 101.9-45.7 101.9-101.9V476.4c0.1-56.2-45.7-101.9-101.9-101.9z" fill="#8a8a8a" p-id="10979"></path></svg>
              {{ dataset.extData?.star?.length || 0}}
              赞
            </span>
            <span>
              <svg t="1652959071947" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11951" width="16" height="16"><path d="M510.557138 204.354248c-302.839283 0-458.323497 306.150702-458.323497 306.150702s117.330242 306.189587 458.323497 306.189587c308.802088 0 458.300984-304.995389 458.300984-304.995389S818.167075 204.354248 510.557138 204.354248L510.557138 204.354248 510.557138 204.354248zM511.245823 701.866279c-110.729917 0-190.772928-83.72589-190.772928-191.364399 0-107.647719 80.049151-191.352119 190.772928-191.352119 110.723777 0 190.763718 83.697237 190.763718 191.352119C702.010565 618.140389 621.970624 701.866279 511.245823 701.866279L511.245823 701.866279 511.245823 701.866279zM511.245823 395.675668c-63.286372 0.145309-114.460892 53.321416-114.460892 114.827235 0 61.473073 51.175543 114.821095 114.460892 114.821095 63.282279 0 114.453728-53.352115 114.453728-114.821095C625.703645 448.975595 574.529125 395.556964 511.245823 395.675668L511.245823 395.675668 511.245823 395.675668z" p-id="11952" fill="#8a8a8a"></path></svg>
              {{ dataset.extData?.skim || 0}}
              浏览
            </span>
            <span>
              <svg t="1652959355808" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12869" width="16" height="16"><path d="M570.5 135.2l99.2 209.6L873 366.4c45.8 4.9 63.2 62.6 27.6 91.9L738.7 591.9l50.2 224.2c10 44.8-38.6 79.7-77.8 55.9L523.5 757.9 335.9 872c-39.2 23.8-87.8-11.1-77.8-55.9l50.2-224.2-161.9-133.5c-35.6-29.3-18.2-87.1 27.6-91.9l203.2-21.6 99.2-209.6c18.9-39.8 75.3-39.8 94.1-0.1z" fill="#8a8a8a" p-id="12870"></path></svg>
              {{ dataset.extData?.take?.length || 0}}
              收藏
            </span>
            <span>
              <svg t="1652958879519" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9650" width="11" height="11"><path d="M1023.826153 41.283664v732.264589a104.635178 104.635178 0 0 1-75.206534 108.994977q-199.824125 68.848494-399.64825 136.062064c-33.243468 11.262814-44.324624 5.994724-60.492213-26.340453-12.716081-24.887186-24.887186-50.13769-37.421608-75.206535a90.829148 90.829148 0 0 0-88.285932-57.222363q-117.714575 1.453266-236.155784 0A127.160807 127.160807 0 0 1 40.691458 835.67539a101.910304 101.910304 0 0 1-40.5098-79.92965V39.467081C0.181658 4.225372 21.798995-8.854025 53.589197 7.313563c66.305278 33.06181 132.247239 66.668594 199.824125 98.822113a105.725128 105.725128 0 0 0 43.053016 8.53794h432.71006a124.435932 124.435932 0 0 0 51.045981-12.171106c61.945479-30.88191 124.617591-63.580403 187.289702-95.370605 33.970101-16.894221 56.314072-3.088191 56.314072 34.151759z m-118.077892 444.881166a89.375881 89.375881 0 1 0-88.649248 90.829147 90.829148 90.829148 0 0 0 88.649248-90.829147z m-394.198501 71.39171a72.663318 72.663318 0 0 0 72.663318-75.388193 71.573368 71.573368 0 0 0-71.028393-74.298243 74.934047 74.934047 0 0 0-1.998242 149.868094z m-215.26508-70.846735a89.739198 89.739198 0 0 0-88.830907-90.829148 90.829148 90.829148 0 1 0 88.830907 90.829148z" fill="#8a8a8a" p-id="9651"></path></svg>
              {{ dataset.extData?.eval?.length || 0}}
              评论
            </span>
          </div>
        </figure>
      </div>
    </article>
  </router-link>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Loading } from "@element-plus/icons-vue";
import Api from "@/api";
import { getUuiD } from '@/utils'
import Cookies from "js-cookie";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "CommonItem",
  components: {
    Loading,
  },
  props: {
    dataset: {
      type: Object,
      default() {
        return {};
      },
    },
    list: {
      type: Array,
    },
  } as const,
  setup(props) {
    const isLoading = ref(false);
    const getActionIcon = computed(() => {
      return props.dataset.isPublished ? "iconstop" : "iconplay";
    });

    const getVal = (vNode) => {
      let value = "";
      const forVal = (v) => {
        if (v.children && v.children.length) {
          v.children.forEach((el) => {
            forVal(el);
          });
        }
        v.xs_value && (value += v.xs_value);
      };
      forVal(vNode);
      return value;
    };
    // 浏览
    const changeSkim = async () => {
      let temExtData;
      temExtData = {
        ...(props.dataset.extData || {}),
        skim: Number(props.dataset.extData?.skim || 0) + 1
      };
      await Api.adornNote({
        ...props.dataset,
        extData: temExtData,
      });
    };
    return {
      isLoading,
      getActionIcon,
      getVal,changeSkim
    };
  },
});
</script>

<style lang="scss" scoped>
.common-item-container {
  position: relative;
  overflow: hidden;
  padding: 12px 18px;
  border-radius: 8px;
  box-sizing: border-box;
  margin-bottom: 16px;
  transition: all 0.3s;
  color: #303133;
  user-select: none;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.15), 1px 2px 6px 0px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  &:hover {
    font-weight: 460;
    background-color:#f3f8f1;
  }
  h4 {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .common-item-content {
    flex: 1;
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    &__img {
      display: block;
      max-width: 300px;
      height: 120px;
      width: 214px;
      border-radius: 3px;
      background-color: var(--xs-color-info-light-9) ;
    }
    figure {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 120px;
      padding: 8px 16px;
      font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      .common-item-content-text {
        font-size: 12px;
        line-height: 150%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      .common-item-content-options {
        font-size: 12px;
        color: var(--xs-color-info-dark-2);
        display: flex;
        align-items: flex-end;
        span {
          display: flex;
          align-items: center;
          padding-left: 24px;
          svg {
            padding-right: 8px;
          }
        }
      }
    }
  }
}
</style>
