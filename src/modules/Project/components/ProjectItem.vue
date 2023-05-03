<template>
  <router-link :to="`/lett/${dataset.noteid}/ov`">
    <ul class="project-item-container BgColor_Notice">
      <li style="flex: 1; min-width: 0">
        <div class="project-item__name">
          <div class="project-item__name-left">
            <img
              v-if="dataset.cover"
              style="height: auto; width: 100%"
              :src="`${dataset.cover}?${Date.now}`"
              alt=""
            />
            <IconFont v-else icon="iconfile" />
          </div>
          <div class="project-item__name-desc">
            <div class="project-item__name-desc__corpname Color_Content">
              <span class="project-item__name-desc__corpname-maintext text_nowrap">{{
                dataset.subtitle || "未设置文章标题"
              }}</span>
              <span @click.prevent>
                <TooltipCustom v-if="dataset.notes" :content="dataset.notes">
                  <IconFont icon="iconhelp" class="corpname-notes" />
                </TooltipCustom>
              </span>
            </div>
            <div class="project-item__name-desc__fullname text_nowrap">
              <span style="transform: scale(0.89);">{{
                getVal(dataset.vNode) || "空"
              }}</span>
            </div>
          </div>
        </div>
      </li>

      <li class="project-item-time text_nowrap Color_Content">
        {{ dataset.createTime }}
      </li>
      <li
        class="project-item-action text_nowrap"
        :class="{
          active: dataset.published,
          loading: isLoading,
        }"
      >
        <span @click.prevent="handlePublish(dataset.noteid)" class="project-item-action__icon">
          <IconFont v-if="!isLoading" :icon="getActionIcon" />
          <Loading v-else class="transform-rotate360" />
        </span>
        <TooltipCustom
          :content="
            dataset.published
              ? '停止分享其他人将不会看到你这篇文章'
              : '发布到社区，别人也可以看到哦'
          "
        >
          <span @click.prevent="handlePublish(dataset.noteid)" class="project-item-action__status Color_Content">
            {{ dataset.published ? "停止分享" : "发布" }}
          </span>
        </TooltipCustom>
      </li>
      <div class="project-item-delete" @click.prevent="handleDelete(dataset.noteid)">
        <TooltipCustom :content="'删除后不能还原，请谨慎操作'">
          <svg
            t="1652531995990"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5670"
            width="14"
            height="14"
          >
            <path
              d="M716.8 0H307.2v68.266667H102.4a68.266667 68.266667 0 0 0-68.266667 68.266666v68.266667h955.733334V136.533333a68.266667 68.266667 0 0 0-68.266667-68.266666h-204.8V0zM102.4 341.333333v614.4a68.266667 68.266667 0 0 0 68.266667 68.266667h682.666666a68.266667 68.266667 0 0 0 68.266667-68.266667V273.066667H102.4v68.266666z m136.533333 546.133334V409.6h136.533334v477.866667H238.933333z m204.8 0V409.6h136.533334v477.866667H443.733333z m341.333334 0H648.533333V409.6h136.533334v477.866667z"
              p-id="5671"
            ></path>
          </svg>
        </TooltipCustom>
      </div>
    </ul>
  </router-link>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Loading } from "@element-plus/icons-vue";
import Api from "@/api";
import Cookies from "js-cookie";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "ProjectItem",
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
      return props.dataset.published ? "iconstop" : "iconplay";
    });
    const getVal = (vNode) => {
      let value = "";
      const forVal = (v) => {
        if (v && v.children && v.children.length) {
          v.children.forEach((el) => {
            forVal(el);
          });
        }
        if (v && v.xs_value) (value += v.xs_value)
      };
      forVal(vNode);
      return value;
    };
    // 修改发布状态
    async function handlePublish(noteid) {
      if (isLoading.value) return;
      const { published } = props.dataset;
      if (!published && !getVal(props.dataset.vNode)) {
        ElMessage.error('不能发布空文章哦～')
        return
      }
      isLoading.value = true;
      await Api.editNote({
        ...props.dataset,
        published: !published,
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
        uid: userInfo.uid,
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
.project-item-container {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 24px;
  box-shadow: 0px 1px 4px 0px rgba(#000, 0.08);
  border-radius: 8px;
  margin-bottom: 16px;
  user-select: none;
  border: 1px solid transparent;

  .project-item__name {
    display: flex;
    align-items: center;
    min-width: 0;
    .project-item__name-left {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 5px;
      background-color: #ecf3ff;
      margin-right: 16px;
      & > svg {
        width: 20px;
        font-size: 20px;
        color: $color-primary;
      }
    }
    .project-item__name-desc {
      flex: 1;
      overflow: hidden;
      .project-item__name-desc__corpname {
        display: flex;
        align-items: center;
        font-size: 14px;
        padding: 2px 6px;
        .project-item__name-desc__corpname-maintext {
          max-width: 80%;
          margin-right: 10px;
        }
        .corpname-notes {
          font-size: 15px;
          color: $color-info;
          cursor: pointer;
        }
      }
      .project-item__name-desc__fullname {
        font-size: 12px;
        color: $color-info;
        margin-top: 3px;
        transform: scale(0.86);
        margin-left: -7%;
      }
    }
  }
  .project-item-time {
    width: 19.5%;
    padding-left: 12px;
    font-size: 12px;
    font-family: cursive;
    flex: initial;
  }
  .project-item-delete {
    --svg: none;
    transition: 0.28s;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(28px, -28px);
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    padding: 14px;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    background: var(--xs-color-primary-light-9);
    &:hover {
      border-radius: 0;
      padding: 25px;
      transform: translate(0, 0);
      display: flex;
      background: var(--xs-color-danger-light-3);
    }
  }
  .project-item-action {
    flex: initial;
    display: flex;
    align-items: center;
    width: 19%;
    height: 100%;
    font-size: 12px;
    transition: 0.3s;
    cursor: pointer;

    .project-item-action__icon {
      width: 20px;
      & > svg {
        width: 100%;
        font-size: 20px;
      }
    }
    .project-item-action__status {
      padding-left: 6px;
    }

    &.active {
      color: $color-primary;
    }
    &.loading {
      color: $color-primary;
    }
    &:hover {
      color: #6b9eff;
    }
  }
}
</style>
