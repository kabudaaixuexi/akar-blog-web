<template>
  <div class="project-form-container">
    <el-form ref="refForm" :model="modelValue" label-position="right" label-width="120px">
      <el-form-item
        prop="title"
        :label="'文章标题'"
        :rules="
          getRequiredRules({
            trigger: 'change',
            message: '请输入文章标题',
          })
        "
      >
        <el-input
          v-model="modelValue.title"
          maxlength="30"
          show-word-limit
          placeholder="请输入文章标题"
        />
      </el-form-item>
      <el-form-item
        prop="drawe"
        label="文章分类"
      >
        <el-select v-model="modelValue.drawe" placeholder="给文章选择一个分类">
          <el-option
            v-for="item in draweOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        prop="tags"
        label="文章标签"
      >
        <el-tag
          v-for="tag in modelValue.tags"
          :key="tag"
          closable
          style="margin-right: 8px"
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          style="width: 80px; height: 24px;"
          size="small"
          maxlength="5"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button v-if="modelValue.tags.length < 3 && !inputVisible" class="button-new-tag ml-1" size="small" @click="showInput">
          + 添加标签
        </el-button>
      </el-form-item>
      <el-form-item prop="cover" class="cover" label="上传封面">
        <span v-if="coverUrl" class="delete-img" @click="setCoverUrl()">
          <TooltipCustom :content="'点击重新选择封面'">
            <svg
              t="1652554082748"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3470"
              width="24"
              height="24"
            >
              <path
                d="M921.54 170.666667H288a53.226667 53.226667 0 0 0-44.373333 23.746666l-192 288a53.18 53.18 0 0 0 0 59.173334l192 288A53.226667 53.226667 0 0 0 288 853.333333h633.54a53.393333 53.393333 0 0 0 53.333333-53.333333V224a53.393333 53.393333 0 0 0-53.333333-53.333333z m-202.453333 432.913333a21.333333 21.333333 0 0 1-30.173334 30.173333L597.333333 542.166667 505.753333 633.753333a21.333333 21.333333 0 0 1-30.173333-30.173333L567.166667 512 475.58 420.42a21.333333 21.333333 0 0 1 30.173333-30.173333L597.333333 481.833333l91.58-91.586666a21.333333 21.333333 0 1 1 30.173334 30.173333L627.5 512z"
                fill="#d6461e"
                p-id="3471"
              ></path>
            </svg>
          </TooltipCustom>
        </span>
        <img style="max-width: 330px; height: auto" v-if="coverUrl" :src="coverUrl" alt="" />
        <el-upload
          v-else
          :show-file-list="false"
          drag
          :on-success="handleExceed"
          action="http://124.220.16.124:8099/upload/setFilesNote"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">拖拽或者 <em>点击上传</em></div>
          <template #tip>
            <div style="transform: scale(0.78)">图片不得大于1000kb，图片比例16/9时展示效果最佳</div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import useCurrentInstance from "@/hooks/useCurrentInstance";
import { defineComponent, reactive, ref, toRefs, nextTick } from "vue";
import { ElInput } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import { useState } from "@/hooks/base";
import { draweOptions } from '../data'
export default defineComponent({
  name: "ProjectForm",
  props: {
    modelValue: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: { UploadFilled },
  setup(props: any) {
    const [coverUrl, setCoverUrl] = useState("");
    const refForm = ref();
    const state: any = reactive({
      inputValue: "",
      inputVisible: false,
    });
    const InputRef = ref<InstanceType<typeof ElInput>>();
    const showInput = () => {
      state.inputVisible = true;
      nextTick(() => {
        console.log(InputRef);
        InputRef.value!.input!.focus();
      });
    };
    const handleClose = (tag: string) => {
      props.modelValue.tags.splice(props.modelValue.tags.indexOf(tag), 1);
    };
    const handleInputConfirm = () => {
      if (state.inputValue) {
        props.modelValue.tags.push(state.inputValue);
      }
      state.inputVisible = false;
      state.inputValue = "";
    };
    const validateRules = async () => {
      return new Promise((resolve) => {
        refForm.value.validate((valid: boolean) => {
          if (valid) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    };
    // 上传成功
    const handleExceed = (response, uploadFile) => {
      const { data } = response;
      setCoverUrl(data[0]);
      props.modelValue.cover = data[0]
    };
    return {
      ...toRefs(state),
      showInput,
      handleClose,
      handleInputConfirm,
      refForm,
      handleExceed,
      coverUrl,
      setCoverUrl,
      validateRules,
      draweOptions
    };
  },
});
</script>

<style lang="scss" scoped>
.project-form-container {
  .footer-button-list {
    display: flex;
    justify-content: flex-end;
  }
  .el-select {
    width: 100%;
  }
}
.cover {
  position: relative;
  .delete-img {
    position: absolute;
    right: -6px;
    top: 0;
  }
}
</style>
