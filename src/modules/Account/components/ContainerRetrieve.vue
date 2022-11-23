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
      <el-input
          v-model="modelValue.title"
          maxlength="30"
          show-word-limit
          placeholder="请输入文章标题"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, nextTick } from "vue";
import { ElInput } from "element-plus";
import { UploadFilled } from "@element-plus/icons-vue";
import Api from "@/api"
export default defineComponent({
  name: "ContainerRetrieve",
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

    return {
      ...toRefs(state),
      showInput,
      handleClose,
      handleInputConfirm,
      refForm,
      validateRules,
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
