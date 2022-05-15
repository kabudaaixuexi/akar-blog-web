<template>
  <router-link :to="`/resultDetail/${dataset.noteid}/overview`">
    <article class="common-item-container">
      <h4 style="margin-bottom: 12px">{{dataset.subtitle || '空标题'}}</h4>
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
    const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
    const isLoading = ref(false);
    const getActionIcon = computed(() => {
      return props.dataset.isPublished ? "iconstop" : "iconplay";
    });
    console.log(props.dataset);

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
    // 修改发布状态
    async function handlePublish(noteid) {
      if (isLoading.value) return;
      isLoading.value = true;
      const { subtitle, vNode, lockValue, lock, published, cover, tags, drawe } = props.dataset;
      await Api.editNote({
        uid: userInfo.userName,
        noteid,
        subtitle,
        vNode,
        lockValue,
        lock,
        published: !published,
        cover,
        tags,
        drawe
      });
      isLoading.value = false;
      ElMessage.success({
        message: "文章状态更新成功",
      });
      props.dataset.published = !props.dataset.published;
    }
    // 删除文章
    async function handleDelete(noteid) {
      await Api.removeNote({
        uid: userInfo.userName,
        noteid,
      });
      props.list?.forEach(
        (el: any, index: number) => el.noteid == noteid && props.list?.splice(index, 1)
      );
       ElMessage.success({
        message: "删除文章成功",
      });
    }
    return {
      isLoading,
      getActionIcon,
      getVal,
      handlePublish,
      handleDelete
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
  .common-item-content {
    flex: 1;
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    &__img {
      display: block;
      max-width: 300px;
      height: 100px;
      width: 20%;
      border-radius: 3px;
      background-color: var(--xs-color-info-light-9) ;
    }
    figure {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100px;
      padding: 6px 16px;
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
