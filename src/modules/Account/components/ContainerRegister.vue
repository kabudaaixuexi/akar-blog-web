<template>
  <div class="user-account-container-layout">
    <div class="form-title">
      <svg t="1676464499512" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5932" width="40" height="40"><path d="M796.3 231.1l-2-2c-155.9-156.3-408.9-155.9-565.2 0-156.3 155.9-155.9 409.4 0 565.4C304.2 870 405.7 912 512.1 912h298.2c16.8 0 30.8-13.6 30.8-30.8V739.3c22-32 39.2-66.4 51.6-103.2 45.9-142.3 8.7-298.6-96.4-405zM477.7 672.9l24.4-129.5H389.8L365 672.9h-66l58.8-308.3h66L400.9 485h112.7l23.2-120.3h66L544 672.9h-66.3z m191.1 0h-66L645.6 449h66l-42.8 223.9z m45.5-261.5c-7.6 7.2-17.6 10.8-27.6 10-16.8 0.8-31.2-12-32-28.8v-3.2c0-10 4-19.6 11.2-26.8 7.2-7.2 16.8-10.8 26.8-10.8 17.2-1.2 32 12 33.2 29.2v3.2c0 10-4.4 20-11.6 27.2z m0 0" p-id="5933" fill="#515151"></path></svg>
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
      label-width="101px"
      class="demo-ruleForm"
    >
      <el-form-item label="设置昵称：" prop="userName">
        <el-input v-model="ruleForm.userName" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="设置密码：" prop="passWord">
        <el-input v-model="ruleForm.passWord" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="上传头像：" prop="userPortrait">
        <el-upload
          action="http://60.204.134.228:8099/upload/setFilesNote"
          :show-file-list="false"
          :multiple="false"
          :limit="1"
          :on-success="handleExceed"
        >
          <img
            style="border-radius: 6px; border: 1px solid #f6f6f6; width: 64px; height: 64px"
            v-if="ruleForm.userPortrait"
            :src="ruleForm.userPortrait"
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
            <path d="M738.7 61H285.3C172.2 61 80.2 153 80.2 266v492c0 113.1 92 205.1 205.1 205.1h453.4c113.1 0 205.1-92 205.1-205.1V266c0-113-92-205-205.1-205z m150.7 697c0 83.1-67.6 150.7-150.7 150.7H285.3c-83.1 0-150.7-67.6-150.7-150.7V266c0-83.1 67.6-150.7 150.7-150.7h453.4c83.1 0 150.7 67.6 150.7 150.7v492z" fill="#cdcdcd" p-id="5411"></path><path d="M392.6 635c-0.4 0-0.9-0.1-1.3-0.1-0.2 0-0.4 0.1-0.7 0.1h2z" fill="#cdcdcd" p-id="5412"></path><path d="M647.6 421.5c-24.5-52.9-77.8-87-136.3-87-58.6 0-111.9 34.2-136.4 87.2-50.4 8.6-89.7 54.8-89.7 105.9 0 58.8 47.5 106.6 106 107.3 12.2-0.4 22-10.3 22-22.6 0-12.5-10.2-22.7-22.7-22.7h2c-34.2 0-62-27.8-62-62 0-33.5 27.2-61.3 60.7-61.9 9.5-0.2 17.9-6.3 21-15.3 14.6-42.2 54.4-70.5 99.1-70.5 44.6 0 84.4 28.3 99.1 70.5 3.2 9.1 11.7 15.2 21.3 15.2 34 0.2 61.6 28 61.6 62 0 32.8-25.6 60-58.4 61.9-0.4 0-0.8 0-1.2 0.1h-0.5c-12.5 0-22.7 10.2-22.7 22.7s10.2 22.7 22.7 22.7h2.9c1 0 2.9-0.1 3.6-0.3 55.4-4.4 98.9-51.4 98.9-107 0.1-51.9-39.8-98.3-91-106.2z" fill="#cdcdcd" p-id="5413"></path><path d="M527.3 531.9c-1-1-2-1.8-3.5-2.8l-1.2-0.7c-0.6-0.3-1.1-0.6-1.7-0.9-0.6-0.2-1.1-0.4-2.3-0.8l-1.4-0.4c-1.3-0.3-2.6-0.4-3.9-0.4-1.3 0-2.6 0.1-3.9 0.4-0.5 0.1-0.9 0.2-1.8 0.5-0.6 0.2-1.3 0.4-1.8 0.6-0.6 0.2-1.1 0.5-2.2 1.1l-1.3 0.7c-1.1 0.7-2.1 1.6-3 2.5l-54 54c-3.8 3.7-5.8 8.7-5.8 14.1 0 5.3 2.1 10.3 5.8 14.1 3.6 3.6 8.7 5.7 14.1 5.7 5.3 0 10.4-2.1 14-5.7l20.1-20.1V724c0 11 8.9 19.9 19.9 19.9 11 0 19.9-8.9 19.9-19.9V593.9l20.1 20.1c7.2 7.2 20.9 7.2 28.1 0 3.8-3.8 5.8-8.7 5.8-14.1 0-5.3-2.1-10.3-5.8-14.1l-54.2-53.9z" fill="#cdcdcd" p-id="5414"></path>
          </svg>
        </el-upload>
      </el-form-item>
    </el-form>
    <div class="submit-form-action-list">
      <el-button class="submit-form-action-button" size="large" type="primary" @click="chatRegister"
        >
        注册并登录
        </el-button
      >
    </div>
    <p style="font-size: 12px; text-align: center;margin-top: 24px;">手机号绑定及其它个人信息可登录后进入个人主页补充</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import Api from "@/api";
import Cookie from "js-cookie";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import { useState } from "@akar/vue-hooks";
const router = useRouter()
const [ruleForm, setRuleForm] = useState({
  userName: "",
  passWord: "",
  userPortrait: "",
  userPhone: null,
});

const [rules, setRules] = useState({
  userName: [
    { required: true, message: "昵称不能为空", trigger: "blur" },
    {
      min: 1,
      max: 18,
      message: "昵称长度不能超过18个字节",
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
    userPortrait: ev.data,
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
    .form-title-text {
      font-size: 26px;
      padding-left: 10px;
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
    margin-top: 20px;
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
