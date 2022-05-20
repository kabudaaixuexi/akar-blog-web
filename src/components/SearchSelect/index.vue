<template>
  <el-autocomplete
    v-model.trim="searchValue"
    v-bind="$attrs"
    size="small"
    class="search-input-container"
    popper-class="search-select-container"
    :trigger-on-focus="false"
    :fetch-suggestions="handleSearch"
    :placeholder="placeholder"
    @select="handleSelect"
    @keydown.capture="keydown($event)"
  >
    <template v-if="loading" #suffix>
      <el-icon class="search-loading-icon">
        <loading />
      </el-icon>
    </template>
    <template v-else #suffix>
      <i class="search-icon">
        <IconFont icon="iconsearch" />
      </i>
    </template>
    <template #default="{ item }">
      <TooltipCustom placement="right" :content="`作者：${item.uid}`">
          <div class="search_content" @click="handleChange(item.noteid)">
            <span v-html="item.subtitle" />
            <span v-html="item.content" />
          </div>
      </TooltipCustom>
    </template>
  </el-autocomplete>
</template>

<script lang="ts">
import {
  ComponentPublicInstance,
  defineComponent,
  getCurrentInstance,
  nextTick,
  PropType,
  ref,
  watch,
} from "vue";
import { Loading } from "@element-plus/icons-vue";
import { debounce } from "lodash";
import useCurrentInstance from "@/hooks/useCurrentInstance";

export default defineComponent({
  name: "SearchSelect",
  components: {
    Loading,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    fetch: {
      type: Function,
      default() {
        return () => {};
      },
    },
    path: {
      type: String,
      default: '/'
    }
  } as const,
  emits: ["update:modelValue", "change", "select"],
  setup(props) {
    const { proxy } = useCurrentInstance();
    const loading = ref(false);
    const searchValue = ref("");

    watch(
      () => props.modelValue,
      (val) => {
        searchValue.value = val;
      },
      {
        immediate: true,
      }
    );

    watch(
      () => searchValue,
      debounce(function (val) {
        proxy.$emit("update:modelValue", val);
        proxy.$emit("change", val);
      }, 300)
    );

    return {
      loading,
      searchValue,
    };
  },
  methods: {
    keydown(event: KeyboardEvent) {
      // 阻止中文输入法下的回车事件，避免触发 select 事件
      if (event.keyCode === 229) {
        event.returnValue = false;
        event.stopPropagation();
      }
      // 修复按下空格匹配不到选项的 bug
      if (event.keyCode === 32) {
        event.returnValue = false;
      }
    },
    getExecText(tags: string) {
      return tags.replace(
        // eslint-disable-next-line prefer-regex-literals
        new RegExp(/(<([^>]+)>)/, "gi"),
        ""
      );
    },
    handleSelect({ value }: any) {
      this.$emit("select", value);
    },
    handleChange(noteid) {
      this.$router.push(`/${this.$props.path}/${noteid}/overview`)
    },
    async handleSearch(queryString: string, callback: any) {
      this.loading = true;
      const res = await this.fetch(queryString);
      callback(res);
      setTimeout(() => {
        nextTick(() => {
          this.loading = false;
        });
      }, 200);
    },
  },
});
</script>

<style lang="scss">
.search-input-container {
  width: 240px;
  .search-loading-icon {
    color: #606266;
    font-size: 16px;
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 4px;
    svg {
      animation: rotate-360 3s linear infinite;
    }
  }
  .search-icon {
    color: #606266;
    height: 100%;
    line-height: 30px;
    font-size: 16px;
    padding-right: 4px;
  }
  .el-input__inner {
    height: 30px;
    line-height: 30px;
  }
}
.search-select-container {
  .el-autocomplete-suggestion__list {
    li {
      background-color: #fff;
      padding-top: 2px;
      padding-bottom: 2px;
    }
  }
}
.search-select-highlight {
  color: $color-primary;
}
.search_content {
  transition: all 0.2s;
  width: 260px;
  position: relative;
  border-radius: 3px;
  &:hover {
    border:calc(1px / 2) solid var(--xs-color-primary-light-7);
    padding:0 12px;
    background-color: var(--el-fill-color-light);
    box-sizing: border-box;
  }
  span:nth-of-type(1) {
    display: block;
    color: var(--el-text-color-regular);
    font-size: 14px;
    height: 24px;
    border-radius: 3px 3px 0 0;
  }
  span:nth-of-type(2) {
    white-space: nowrap;
    margin-top: -4px;
    height: 33px;
    text-overflow: ellipsis;
    display: block;
    font-size: 12px;
    border-radius: 0 0 3px 3px;
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      font-size: 12px;
      color: var(--xs-color-info-dark-2);
      border-radius: 0 0 3px 3px;
    }
  }
}
</style>
