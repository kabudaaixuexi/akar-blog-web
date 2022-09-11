<template>
  <div class="user-account-container-layout">
    <div class="form-title">
      <div class="form-title-icon">
        <el-icon>
            <Sugar />
          </el-icon>
      </div>
      <p class="form-title-text">
        {{ '欢迎加入' }}
      </p>
      <p class="form-desc-text">
      </p>
    </div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="88px"
      class="demo-ruleForm"
    >
      <el-form-item label="昵称：" prop="userName">
        <el-input v-model="ruleForm.userName" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="密码：" prop="passWord">
        <el-input v-model="ruleForm.passWord" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="上传头像：" prop="photo">
        <el-upload
          action="http://124.220.16.124:8099/upload/setFilesNote"
          :show-file-list="false"
          :multiple="false"
          :limit="1"
          :on-success="handleExceed"
        >
          <img
            style="border-radius: 6px; border: 1px solid #f6f6f6; width: 64px; height: 64px"
            v-if="ruleForm.photo"
            :src="ruleForm.photo"
            alt=""
          />
          <svg
            v-else
            t="1650383901998"
            class="icon"
            viewBox="0 0 1029 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5615"
            width="64"
            height="64"
          >
            <path
              d="M661.23 1003.042H119.672c-64.034 0-116.053-51.883-116.053-115.712V115.917C3.618 52.224 55.638 0.068 119.671 0.068H893.27c63.898 0 115.985 52.02 115.985 115.849v539.99c0 21.23-17.34 38.775-38.707 38.775s-38.912-17.34-38.912-38.776v-539.99c0-21.23-17.34-38.638-38.57-38.638H119.67c-21.299 0-38.912 17.408-38.912 38.639v771.14c0 21.231 17.613 38.639 38.912 38.639h541.492c21.162 0 38.707 17.203 38.707 38.639 0.068 21.3-17.545 38.707-38.64 38.707z"
              fill="#bfbfbf"
              p-id="5616"
            ></path>
            <path
              d="M42.325 771.755c-9.762 0-19.729-4.028-27.238-11.606-14.95-14.95-14.95-39.458 0-54.408l192.785-192.034c35.157-35.158 89.156-44.169 133.803-21.777L551.39 596.65c14.814 7.578 32.768 4.643 44.373-7.167l347.614-346.317c14.95-15.019 39.458-15.019 54.682 0 15.223 14.882 15.087 39.39 0 54.545l-347.75 346.317c-35.09 35.089-88.816 43.759-133.667 21.367L306.86 561.084c-14.95-7.578-32.7-4.506-44.374 7.168L69.7 760.012c-7.51 7.578-17.34 11.743-27.375 11.743zM351.71 385.775c-63.898 0-116.053-51.746-116.053-115.712 0-63.898 51.882-115.712 116.053-115.712 63.76 0 116.053 51.883 116.053 115.712 0 63.898-52.36 115.712-116.053 115.712z m0-154.146c-21.163 0-38.776 17.271-38.776 38.502 0 21.368 17.477 38.64 38.776 38.64 21.163 0 38.639-17.272 38.639-38.64 0-21.23-17.34-38.502-38.64-38.502zM834.833 1024c-21.367 0-38.844-17.203-38.844-38.775V753.869c0-21.095 17.204-38.64 38.844-38.64 21.163 0 38.776 17.34 38.776 38.64v231.356c-0.069 21.572-17.545 38.775-38.776 38.775z"
              fill="#bfbfbf"
              p-id="5617"
            ></path>
            <path
              d="M989.389 868.284c-9.49 0-18.978-3.345-26.76-10.377l-127.864-120.15-128.478 120.15c-15.36 14.404-39.8 13.858-54.409-1.57-14.677-15.633-13.994-39.868 1.707-54.682L788.89 674.611c11.127-13.721 27.58-21.436 45.533-21.436 17.818 0 34.27 7.988 45.261 21.436l135.441 127.044c15.702 14.814 16.52 38.912 1.775 54.682-6.758 7.782-17.066 11.947-27.511 11.947z"
              fill="#bfbfbf"
              p-id="5618"
            ></path>
          </svg>
        </el-upload>
      </el-form-item>
    </el-form>
    <div class="submit-form-action-list">
      <el-button class="submit-form-action-button" size="large" type="primary" @click="chatRegister"
        >注册并登录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import Api from "@/api";
import Cookie from "js-cookie";
import { ElMessage } from "element-plus";
import { Sugar } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { useState } from "@akar/vue-hooks";
const router = useRouter()
const [ruleForm, setRuleForm] = useState({
  userName: "",
  passWord: "",
  photo: "",
  phone: null,
});

const [rules, setRules] = useState({
  userName: [
    { required: true, message: "昵称不能为空", trigger: "blur" },
    {
      min: 1,
      max: 12,
      message: "昵称长度不能超过12个字节",
      trigger: "blur",
    },
  ],
  passWord: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
  ],
});
const ruleFormRef: any = ref();

const handleExceed = (ev: { data: any }) => {
  setRuleForm((el) => ({
    ...el.value,
    photo: ev.data,
  }));
};
const chatRegister = async () => {
  await ruleFormRef.value.validate((valid: any, fields: any) => {
    if (valid) {
      const data: any = {
        ...ruleForm.value,
      };
      Api.postRegister(data).then((res) => {
        if (res.statusCode == 200) {
          ElMessage({
            type: "success",
            message: "注册成功",
          });
          Cookie.set("token", res.data.token);
          Cookie.set("userInfo", JSON.stringify(res.data));
          router.push(`/k2rp`);
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
onMounted(() => {});
</script>

<style lang="scss" scoped>
.user-account-container-layout {
  width: 438px;
  // margin-right: 80px;
  padding: 50px 34px 90px 34px;
  background: #fff;
  border-radius:6px;
  user-select: none;
  :deep() .el-input .el-input__inner {
    letter-spacing: 1px;
  }
  .form-title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding-bottom: 30px;
    .form-title-icon {
      width: 32px;
      font-size: 0;
      margin-right: 10px;
      &:deep() {
        & > * {
          font-size: 32px;
        }
      }
    }
    .form-title-text {
      font-size: 26px;
      font-weight: 600;
    }
    .form-desc-text {
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      padding: 44px 0 0px;
    }
  }

  .demo-ruleForm {
    :deep() .el-form-item__label {
      letter-spacing: 1px;
      font-weight: 500;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
  }

  .submit-form-action-list {
    display: flex;
    margin-top: 40px;
    .submit-form-action-button {
      flex: 1;
    }
  }
}

@media screen and (max-width: 600px) {
  .user-account-container-layout {
    width: 95%;
    margin: auto;
  }
}
</style>
