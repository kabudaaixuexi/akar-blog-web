<template>
  <div class="project-form-container">
    <el-form
      ref="refForm"
      :model="modelValue"
      label-position="right"
      label-width="120px"
    >
      <el-form-item
        prop="name"
        :label="'文章标题'"
        :rules="getRequiredRules({
          trigger: 'change',
          message: '请输入文章标题'
        })"
      >
        <el-input
          v-model="modelValue.title"
          maxlength="30"
          show-word-limit
          placeholder="请输入文章标题"
        />
      </el-form-item>
      <el-form-item
        prop="dynamicTags"
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
          + New Tag
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import useCurrentInstance from '@/hooks/useCurrentInstance'
import { defineComponent, reactive, ref, toRefs, nextTick } from 'vue'
import {ElInput} from 'element-plus'
export default defineComponent({
  name: 'ProjectForm',
  props: {
    modelValue: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  setup (props: any) {
    const { proxy } = useCurrentInstance()

    const refForm = ref()
    const state: any = reactive({
       inputValue: '',
       inputVisible: false,
    });
    const InputRef = ref<InstanceType<typeof ElInput>>()
    const showInput = () => {
      state.inputVisible = true
      nextTick(() => {
        console.log(InputRef);
        InputRef.value!.input!.focus()
      })
    }
    const handleClose = (tag: string) => {
      props.modelValue.tags.splice(props.modelValue.tags.indexOf(tag), 1)
    }
    const handleInputConfirm = () => {
      if (state.inputValue) {
        props.modelValue.tags.push(state.inputValue)
      }
      state.inputVisible = false
      state.inputValue = ''
    }
    const validateRules = async () => {
      return new Promise((resolve) => {
        refForm.value.validate((valid: boolean) => {
          if (valid) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
      })
    }

    return {
      ...toRefs(state),showInput,handleClose,handleInputConfirm,
      refForm,
      validateRules
    }
  }
})
</script>

<style lang="scss" scoped>
.project-form-container {
  .footer-button-list {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
