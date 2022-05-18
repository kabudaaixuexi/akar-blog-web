<template>
  <div class="user-account-container-layout">
    <div class="form-title">
      <div class="form-title-icon">
        <el-icon>
            <MilkTea />
          </el-icon>
      </div>
      <p class="form-title-text">
        {{ configLogin.title }}
      </p>
      <p class="form-desc-text">
        {{ configLogin.desc }}
      </p>
    </div>
    <el-form
      ref="boxForm"
      :model="formData"
      label-position="top"
      hide-required-asterisk
      @keyup.enter="onSubmit()"
    >
      <template v-for="(formItem, index) in configLogin.formConfig" :key="index">
        <el-form-item v-bind="getFormItemAttrs(formItem.attrs)">
          <div class="form-custom-label">
            <p>{{ formItem.label }}</p>
            <el-link
              v-if="formItem.link"
              type="primary"
              :underline="false"
              @click="handleClickLink(formItem.link)"
            >
              {{ formItem.link.text }}
            </el-link>
          </div>
          <el-input v-model="formData[formItem.attrs.prop]" v-bind="getInputItemAttrs(formItem)">
            <template v-if="formItem.prefixIcon" #prefix>
              <FontAwesomeIcon class="input-icon-prefix" :icon="formItem.prefixIcon" />
            </template>
            <template v-if="formItem.type === 'password'" #suffix>
              <FontAwesomeIcon
                class="input-icon-lock"
                :icon="showPassword ? 'eye' : 'eye-slash'"
                @click="tooglePassword()"
              />
            </template>
          </el-input>
        </el-form-item>
      </template>
      <div
        v-for="(actionItem, index) in configLogin.actionList"
        :key="`${index}-`"
        class="submit-form-action-list"
      >
        <el-button
          v-bind="actionItem.attrs"
          class="submit-form-action-button"
          v-on="getActionItemEvent(actionItem.on) || {}"
        >
          {{ actionItem.text }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick, ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { MilkTea } from "@element-plus/icons-vue";
import { omit } from "lodash";
import Cookie from "js-cookie";
import Api from "@/api";
import { useRoute, useRouter } from "vue-router";
import Store from "@/store";
import { isFunction } from "@/utils/type";
import useCurrentInstance from "@/hooks/useCurrentInstance";
import { useState } from "@akar/vue-hooks";

const [loding, setLoding] = useState(false);
const { proxy } = useCurrentInstance();

const store = Store.getState();
const router = useRouter();

const inputErrorEmail = ref("");
const inputErrorPassword = ref("");
const formData = reactive({
  email: "Administrator",
  password: "q",
});
const configLogin = {
  title: "欢迎登录",
  actionList: [
    {
      attrs: {
        type: "primary",
        loading: loding.value,
        size: "large",
      },
      text: "登 录",
      on: {
        click(refForm: any) {
          onSubmit(refForm);
        },
      },
    },
    {
      attrs: {
        size: "large",
        class: "unlogin",
      },
      text: "先不登录",
      on: {
        click(refForm: any) {
          router.push("/common");
        },
      },
    },
  ],
  formConfig: [
    {
      attrs: {
        prop: "email",
        error: inputErrorEmail.value,
        rules() {
          return [
            proxy.getRequiredRules({
              trigger: "change",
              message: "请输入账号信息",
            }),
          ];
        },
      },
      label: "账号",
      prefixIcon: "user-tie",
      placeholder: "请输入",
    },
    {
      attrs: {
        prop: "password",
        error: inputErrorPassword.value,
        rules() {
          return proxy.getRequiredRules({
            trigger: "change",
            message: "请输入密码",
          });
        },
      },
      // link: {
      //   text: '忘记密码',
      //   click () {
      //     console.log(proxy, 'login.fgtpwd')
      //   }
      // },
      type: "password",
      label: "密码",
      prefixIcon: "lock",
      placeholder: "请输入",
    },
  ],
};
function onSubmit(refForm: any) {
  if (loding.value) return;
  refForm.validate(async (valid: boolean) => {
    if (!valid) return;
    inputErrorEmail.value = "";
    inputErrorPassword.value = "";
    setLoding(true);
    const { data } = await Api.postLogin({
      userName: formData.email,
      passWord: formData.password,
    });
    setLoding(false);
    if (data) {
      Cookie.set("token", data.token);
      Cookie.set("userInfo", JSON.stringify(data));
      ElMessage.success({
        message: "登录成功",
      });
      router.push(`/common`);
    }
  });
}

const showPassword = ref(false);
const boxForm = ref();

function tooglePassword() {
  showPassword.value = !showPassword.value;
}
function getInputItemAttrs(formItem: any) {
  const attrs: any = {};
  const isPassword = formItem.type === "password";
  if (isPassword) {
    attrs.type = showPassword.value ? "text" : "password";
  } else {
    attrs.type = "text";
  }

  return {
    clearable: !isPassword,
    placeholder: formItem.placeholder,
    ...attrs,
  };
}

function getFormItemAttrs(attrs: any) {
  const rules = isFunction(attrs.rules) ? attrs.rules.call(proxy) : "";

  return {
    rules,
    ...omit(attrs, ["rules"]),
  };
}

function getActionItemEvent(on: any) {
  const onEvent: any = {};
  Object.keys(on).forEach((onItem) => {
    onEvent[onItem] = on[onItem].bind(proxy.$parent, boxForm.value);
  });
  return onEvent;
}

function handleClickLink(link: any) {
  link.click.call(proxy.$parent, boxForm.value);
}

setLoding(true);
onMounted(() => {
  nextTick(() => {
    setLoding(false);
  });
});
</script>

<style lang="scss" scoped>
.user-account-container-layout {
  width: 438px;
  // margin-right: 80px;
  padding: 50px 34px 60px 34px;
  background: #fff;
  border-radius: 6px;
  user-select: none;
  :deep() .el-input .el-input__inner {
    letter-spacing: 1px;
  }
  .form-custom-label {
    flex: 1;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 600;
  }
  &:deep() {
    .el-input__prefix-inner {
      margin-left: -4px;
      align-items: center;
    }
    .el-input__suffix-inner {
      align-items: center;
    }
  }
  .input-icon-prefix {
    padding-left: 6px;
    // height: 100%;
  }
  .input-icon-lock {
    cursor: pointer;
    // height: 100%;
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
  .submit-form-action-list {
    display: flex;
    margin-top: 40px;
    .submit-form-action-button {
      flex: 1;
    }
  }
  .submit-form-action-list:last-of-type {
    margin-top: 20px;
  }
}

@media screen and (max-width: 600px) {
  .user-account-container-layout {
    width: 95%;
    margin: auto;
  }
}
</style>
