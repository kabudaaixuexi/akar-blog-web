<template>
  <div class="user-account-login">
    <div class="user-account-nav">
      <div class="nav-left">
        <div class="nav-logo"></div>
        <div class="nav-circle"></div>
        <div class="nav-title">
          {{ '「 好记性不如烂笔头 」' }}
        </div>
      </div>
      <div class="nav-right">
        
      </div>
    </div>
    <div class="user-account-body">
      <UserAccountContainerLayout
        v-bind="configLogin"
        :form-data="formData"
        @on-submit="onSubmit"
      >
        <template
          #titleIcon
        >
          <el-icon>
            <Promotion />
          </el-icon>
        </template>
      </UserAccountContainerLayout>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">

import {
  computed,
  defineComponent,
  getCurrentInstance,
  nextTick,
  onMounted,
  reactive,
  ref
} from 'vue'
import { ElMessage } from 'element-plus'
import { Promotion } from '@element-plus/icons-vue'

import UserAccountContainerLayout from '@/modules/UserAccount/components/ContainerLayout.vue'

import UserAccountModule from '@/modules/UserAccount/store'

import Cookie from 'js-cookie'
import Api from '@/api'
import { useRoute, useRouter } from 'vue-router'
import useCurrentInstance from '@/hooks/useCurrentInstance'

import Store from '@/store'

export default defineComponent({
  name: 'UserAccountLogin',
  components: {
    UserAccountContainerLayout,
    Promotion,
  },
  setup () {
    const { proxy } = useCurrentInstance()

    const store = Store.getState()
    const route = useRoute()
    const router = useRouter()

    const isLoading = ref(true)
    const inputErrorEmail = ref('')
    const inputErrorPassword = ref('')
    const formData = reactive({
      email: 'Administrator',
      password: 'q'
    })

    const configLogin = computed(() => {
      return {
        title: '欢迎登录',
        actionList: [
          {
            attrs: {
              type: 'primary',
              loading: isLoading.value,
              size: 'large'
            },
            text: '登 录',
            on: {
              click (refForm: any) {
                proxy.onSubmit(refForm)
              }
            }
          }
        ],
        formConfig: [
          {
            attrs: {
              prop: 'email',
              error: inputErrorEmail.value,
              rules () {
                return [
                  proxy.getRequiredRules({
                    trigger: 'change',
                    message: '请输入账号信息'
                  })
                ]
              }
            },
            label: '账号',
            prefixIcon: 'user-tie',
            placeholder: '请输入'
          },
          {
            attrs: {
              prop: 'password',
              error: inputErrorPassword.value,
              rules () {
                return proxy.getRequiredRules({
                  trigger: 'change',
                  message: '请输入密码'
                })
              }
            },
            type: 'password',
            label: '密码',
            prefixIcon: 'lock',
            placeholder: '请输入'
          }
        ]
      }
    })

    function setLoading (loading = false) {
      isLoading.value = loading
    }

    function onSubmit (refForm: any) {
      if (isLoading.value) return
      refForm.validate(async (valid: boolean) => {
        if (!valid) return
        inputErrorEmail.value = ''
        inputErrorPassword.value = ''
        setLoading(true)
        console.log(formData);
        const { data } = await Api.postLogin({
          userName: formData.email,
          passWord: formData.password
        })
        Store.setState(data, 'userInfo')
        // Cookie.set('token', data.user.token)
        // Cookie.set('name', data.user.username)
        ElMessage.success({
          message: '登录成功'
        })
        router.push(`/project`)
      })
    }

    setLoading(true)
    onMounted(() => {
      nextTick(() => {
        setLoading(false)
      })
    })

    return {
      isLoading,
      inputErrorEmail,
      inputErrorPassword,
      formData,
      configLogin,

      setLoading,
      onSubmit
    }
  }
})

</script>

<style lang="scss" scoped>
.user-account-login {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f2f5;
  background-image: url('@/assets/images/logo-background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  .user-account-nav {
    display: flex;
    justify-content: space-between;
    color: #484848;
    padding: 0px 16px;
    box-shadow: 0px -3px 8px 3px #c6c6c6;
    // box-shadow: 0 1px 4px 3px rgb(0 21 41 / 8%);
    background-color: rgba(#fff, 10%);
    .nav-left,
    .nav-right {
      display: flex;
      height: 48px;
      align-items: center;
    }
    .nav-logo {
      width: 56px;
      height: 48px;
      background-image: url('@/assets/images/logo-akar.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
    .nav-circle {
      width: 6px;
      height: 6px;
      margin: 0 10px 0 0;
      border-radius: 50%;
      background: #484848;
    }
    .nav-title {
      font-size: 14px;
      font-weight: 600;
      font-family:serif;
      line-height: 25px;
    }
  }
  .user-account-body {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

@media screen and (max-width: 600px) {
  .user-account-container-layout {
    justify-content: center;
    .user-account-nav {
      left: 0;
      right: 0;
      margin: auto;
      justify-content: center;
    }
  }
}
</style>
