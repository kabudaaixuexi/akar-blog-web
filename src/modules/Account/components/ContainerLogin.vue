<template>
  <div class="user-account-container-layout">
    <div class="form-title">
      <svg t="1676465054732" class="icon" viewBox="0 0 1870 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12158" width="48" height="48"><path d="M807.294308 496.669005c-12.430537-11.601834-24.861074-24.861074-36.462908-38.120313l-436.44996 0-37.29161 38.120313L155.450769 496.669005c37.29161-38.120313 71.268411-74.514162 101.032641-110.148368C221.746965 336.867548 190.256272 284.659293 160.492042 230.03399l113.463178 0C287.974103 255.654707 302.890747 280.515781 318.636094 305.376855 341.01106 273.057459 360.899919 241.635824 379.131373 207.659023c2.486107-4.972215 1.657405-9.944429-0.828702-14.916644C374.987861 187.770165 370.015646 185.284057 365.043431 185.284057L155.450769 183.626652 155.450769 138.117076l303.995684 0c15.745347 0 29.833288 7.458322 38.051254 20.717561 9.944429 13.259239 11.601834 28.935527 5.800917 43.852172-30.592932 70.439709-74.514162 142.467764-129.208524 209.592663l357.792285 0C664.826544 326.923118 605.229026 224.233073 550.534664 114.015646l122.578905 0C684.784462 138.117076 696.317238 161.251686 709.576477 183.626652l21.546264-50.55085 110.97707 0c-21.546264 53.86566-43.092528 106.004856-68.713245 154.069598 8.287025 12.430537 15.745347 24.861074 24.861074 36.462908 9.944429-20.717561 19.060156-42.263825 28.175883-63.810089l110.97707 0c-20.717561 53.86566-43.92123 106.004856-69.541948 154.898301 22.374966 28.175883 45.578635 55.523064 70.439709 82.041543L807.294308 496.738063zM157.108174 847.072026l132.523334 0-37.29161-99.375236 125.065012 0 38.120313 99.375236 264.217966 0 36.462908-99.375236 125.893715 0-36.393849 99.375236 131.694632 0 0 47.23604L157.108174 894.308066 157.108174 847.072026zM217.603453 568.766118c0-30.661991 24.861074-55.523064 54.694362-55.523064l549.913137 0c29.833288 0 53.86566 24.861074 53.86566 55.523064l0 101.032641c0 31.490693-24.032371 55.523064-53.86566 55.523064L272.297815 725.321824c-29.833288 0-54.694362-24.032371-54.694362-55.523064L217.603453 568.766118zM751.0116 591.969787c0-16.574049-14.087942-31.490693-31.490693-31.490693L374.987861 560.479094c-17.402752 0-31.490693 14.916644-31.490693 31.490693l0 54.694362c0 17.402752 14.087942 31.490693 31.490693 31.490693l344.533046 0c17.402752 0 31.490693-14.087942 31.490693-31.490693L751.0116 591.969787z" p-id="12159" fill="#515151"></path><path d="M1055.421635 277.200971l545.009981 0L1600.431616 210.145131c0-17.402752-14.087942-31.490693-31.490693-31.490693l-543.352576 0L1025.588346 131.418398l645.21392 0c29.833288 0 55.523064 25.689776 55.523064 55.523064l0 236.870785 40.60642 0 0 47.23604-329.616401 0 0 370.222822c0 30.661991-24.861074 55.523064-54.694362 55.523064l-156.555705 0 0-47.23604 53.86566 0c17.402752 0 31.490693-14.087942 31.490693-31.490693L1311.421635 471.048287l-327.130294 0L984.291341 423.812247l616.209334 0L1600.500674 324.437011l-545.009981 0L1055.490693 277.200971zM1196.231994 687.201511c-16.574049 77.828972-35.634206 148.199622-67.05584 211.181009l-127.55112 0c29.833288-66.227138 54.694362-135.838144 68.782304-211.181009L1196.231994 687.201511zM1070.338279 648.321554l-47.23604-137.495549 125.893715 0 47.23604 137.495549L1070.338279 648.321554zM1539.107634 648.321554l47.23604-137.495549 125.893715 0L1665.001349 648.321554 1539.107634 648.321554zM1665.001349 687.201511c14.916644 75.342865 38.879957 144.953871 68.713245 211.181009l-127.55112 0c-31.490693-62.912328-50.55085-133.352037-67.124899-211.181009L1665.001349 687.201511z" p-id="12160" fill="#515151"></path></svg>
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
              <!-- <span style="font-size: 12px">{{ formItem.link.text }}</span> -->
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
import { omit } from "lodash";
import Cookie from "js-cookie";
import Api from "@/api";
import { useRoute, useRouter } from "vue-router";
import Store from "@/store";
import { isFunction } from "@/utils/type";
import useCurrentInstance from "@/hooks/useCurrentInstance";
import { useState } from "@akar/vue-hooks";
import ContainerRetrieve from './ContainerRetrieve.vue'

const [loding, setLoding] = useState(false);
const { proxy } = useCurrentInstance();

const store = Store.getState();
const router = useRouter();

const inputErrorEmail = ref("");
const inputErrorPassword = ref("");
const formData = reactive({
  email: "",
  password: "",
});
const configLogin = {
  title: "「Akar」",
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
          Cookie.remove("token");
          Cookie.remove("userInfo");
          router.push("/k2rp");
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
      placeholder: "请输入手机号或昵称",
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
      link: {
        text: "忘记密码",
        click() {
          proxy.$ModalDialog({
            title: "找回密码",
            top: "20vh",
            width: "50vw",
            "show-close": true,
            "close-on-click-modal": false,
            "close-on-press-escape": false,
            renderComponent: {
              data: reactive({
                email: "",
                password: "",
              }),
              component: ContainerRetrieve,
            },
            async onConfirm(instance, context) {
              const isValid = await instance.validateRules();
              if (!isValid) return Promise.reject(new Error("error"));
              const {  } = formData;

            },
          });
        },
      },
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
      router.push(`/k2rp`);
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
  padding: 68px 34px 60px 34px;
  background-color: #fff;
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
