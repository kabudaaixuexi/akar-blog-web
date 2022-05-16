<template>
  <router-link :to="`/resultDetail/${dataset.noteid}/overview`">
    <article class="common-item-container">
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
    return {
      isLoading,
      getActionIcon,
      getVal,
    };
  },
});
</script>

<style lang="scss" scoped>
.common-item-container {
  position: relative;
  overflow: hidden;
  padding: 12px 18px;
  box-shadow: 0px 1px 4px 0px rgba(#000, 0.08);
  border-radius: 8px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 16px;
  transition: background 0.3s, border 0.3s, box-shadow 0.3s;
  color: #303133;
  user-select: none;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0 10px 30px -20px rgba(#000, 0.24);
    border: 1px solid #dcdfe6;
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
      }
    }
  }
}
</style>
