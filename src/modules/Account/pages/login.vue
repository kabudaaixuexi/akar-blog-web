<template>
  <div class="user-account-login">
    <!-- <div class="user-account-nav">
      <div class="nav-left">
        <div class="nav-logo"></div>
        <div class="nav-circle"></div>
        <div class="nav-title">
          {{ "「 好记性不如烂笔头 」" }}
        </div>
      </div>
      <div class="nav-right"></div>
      {{preLogin}}
    </div> -->
    <div class="user-account-body">
      <figure :class="`${['just', 'back'][preLogin]} account-card`">
        <div @click="setPreLogin(0)" class="account-card-starter">
          <svg t="1652878024339" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11223" width="32" height="32"><path d="M16.275456 782.244864" p-id="11224" fill="#d6461e"></path><path d="M667.128832 729.61024 667.128832 894.184448 957.792256 631.015424 667.128832 385.526784 667.128832 525.357056 395.318272 525.357056 395.318272 729.61024Z" p-id="11225" fill="#d6461e"></path><path d="M326.972416 581.523456 326.972416 457.801728 599.568384 457.801728 599.568384 253.546496 326.972416 253.546496 326.972416 126.67904 67.731456 358.812672Z" p-id="11226" fill="#d6461e"></path><path d="M977.830912 782.244864" p-id="11227" fill="#d6461e"></path></svg>
          <svg t="1652879527979" class="icon" viewBox="0 0 1870 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12158" width="38" height="38"><path d="M807.294308 496.669005c-12.430537-11.601834-24.861074-24.861074-36.462908-38.120313l-436.44996 0-37.29161 38.120313L155.450769 496.669005c37.29161-38.120313 71.268411-74.514162 101.032641-110.148368C221.746965 336.867548 190.256272 284.659293 160.492042 230.03399l113.463178 0C287.974103 255.654707 302.890747 280.515781 318.636094 305.376855 341.01106 273.057459 360.899919 241.635824 379.131373 207.659023c2.486107-4.972215 1.657405-9.944429-0.828702-14.916644C374.987861 187.770165 370.015646 185.284057 365.043431 185.284057L155.450769 183.626652 155.450769 138.117076l303.995684 0c15.745347 0 29.833288 7.458322 38.051254 20.717561 9.944429 13.259239 11.601834 28.935527 5.800917 43.852172-30.592932 70.439709-74.514162 142.467764-129.208524 209.592663l357.792285 0C664.826544 326.923118 605.229026 224.233073 550.534664 114.015646l122.578905 0C684.784462 138.117076 696.317238 161.251686 709.576477 183.626652l21.546264-50.55085 110.97707 0c-21.546264 53.86566-43.092528 106.004856-68.713245 154.069598 8.287025 12.430537 15.745347 24.861074 24.861074 36.462908 9.944429-20.717561 19.060156-42.263825 28.175883-63.810089l110.97707 0c-20.717561 53.86566-43.92123 106.004856-69.541948 154.898301 22.374966 28.175883 45.578635 55.523064 70.439709 82.041543L807.294308 496.738063zM157.108174 847.072026l132.523334 0-37.29161-99.375236 125.065012 0 38.120313 99.375236 264.217966 0 36.462908-99.375236 125.893715 0-36.393849 99.375236 131.694632 0 0 47.23604L157.108174 894.308066 157.108174 847.072026zM217.603453 568.766118c0-30.661991 24.861074-55.523064 54.694362-55.523064l549.913137 0c29.833288 0 53.86566 24.861074 53.86566 55.523064l0 101.032641c0 31.490693-24.032371 55.523064-53.86566 55.523064L272.297815 725.321824c-29.833288 0-54.694362-24.032371-54.694362-55.523064L217.603453 568.766118zM751.0116 591.969787c0-16.574049-14.087942-31.490693-31.490693-31.490693L374.987861 560.479094c-17.402752 0-31.490693 14.916644-31.490693 31.490693l0 54.694362c0 17.402752 14.087942 31.490693 31.490693 31.490693l344.533046 0c17.402752 0 31.490693-14.087942 31.490693-31.490693L751.0116 591.969787z" p-id="12159" fill="#d6461e"></path><path d="M1055.421635 277.200971l545.009981 0L1600.431616 210.145131c0-17.402752-14.087942-31.490693-31.490693-31.490693l-543.352576 0L1025.588346 131.418398l645.21392 0c29.833288 0 55.523064 25.689776 55.523064 55.523064l0 236.870785 40.60642 0 0 47.23604-329.616401 0 0 370.222822c0 30.661991-24.861074 55.523064-54.694362 55.523064l-156.555705 0 0-47.23604 53.86566 0c17.402752 0 31.490693-14.087942 31.490693-31.490693L1311.421635 471.048287l-327.130294 0L984.291341 423.812247l616.209334 0L1600.500674 324.437011l-545.009981 0L1055.490693 277.200971zM1196.231994 687.201511c-16.574049 77.828972-35.634206 148.199622-67.05584 211.181009l-127.55112 0c29.833288-66.227138 54.694362-135.838144 68.782304-211.181009L1196.231994 687.201511zM1070.338279 648.321554l-47.23604-137.495549 125.893715 0 47.23604 137.495549L1070.338279 648.321554zM1539.107634 648.321554l47.23604-137.495549 125.893715 0L1665.001349 648.321554 1539.107634 648.321554zM1665.001349 687.201511c14.916644 75.342865 38.879957 144.953871 68.713245 211.181009l-127.55112 0c-31.490693-62.912328-50.55085-133.352037-67.124899-211.181009L1665.001349 687.201511z" p-id="12160" fill="#d6461e"></path></svg>
        </div>
        <AccountContainerRegister />
      </figure>
      <figure :class="`${['back', 'just'][preLogin]} account-card`">
        <div @click="setPreLogin(1)" class="account-card-starter">
          <svg t="1652878024339" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11223" width="32" height="32"><path d="M16.275456 782.244864" p-id="11224" fill="#d6461e"></path><path d="M667.128832 729.61024 667.128832 894.184448 957.792256 631.015424 667.128832 385.526784 667.128832 525.357056 395.318272 525.357056 395.318272 729.61024Z" p-id="11225" fill="#d6461e"></path><path d="M326.972416 581.523456 326.972416 457.801728 599.568384 457.801728 599.568384 253.546496 326.972416 253.546496 326.972416 126.67904 67.731456 358.812672Z" p-id="11226" fill="#d6461e"></path><path d="M977.830912 782.244864" p-id="11227" fill="#d6461e"></path></svg>
          <svg t="1652877743616" class="icon" viewBox="0 0 1870 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6624" width="38" height="38"><path d="M154.691125 898.451578c42.194767-101.861343 69.541948-189.634745 84.458592-307.241435L362.557324 591.210143c-16.574049 115.051524-43.92123 225.268951-83.629889 307.241435L154.691125 898.451578zM225.890477 298.816293 172.922579 128.172646l125.065012 0L350.126787 298.816293 225.890477 298.816293zM237.492312 532.30321l-54.694362-183.005125 125.065012 0 53.796601 183.005125L237.492312 532.30321zM408.135959 602.811977 408.135959 555.575937l184.66253 0L592.798489 320.293499 390.733207 320.293499 390.733207 273.126517l533.408147 0 0 47.23604-204.551389 0 0 235.282439 186.388994 0 0 47.23604-186.388994 0 0 235.21338 220.296736 0 0 47.23604L375.816563 885.330456l0-47.23604 216.981926 0L592.798489 602.811977 408.135959 602.811977zM594.455894 242.464527 561.376855 110.769895l127.55112 0 32.319396 131.694632L594.455894 242.464527z" p-id="6625" fill="#d6461e"></path><path d="M984.153224 495.080658l31.559752 0L1015.712975 188.598867c0-30.592932 24.032371-55.454006 54.625303-55.454006l226.926356 0c30.661991 0 54.694362 24.792015 54.694362 55.454006l0 306.481791 48.824386 0L1400.783383 188.598867c0-30.592932 25.689776-55.454006 55.523064-55.454006l226.926356 0c30.592932 0 55.523064 24.792015 55.523064 55.454006l0 306.481791 28.106825 0 0 47.23604-28.106825 0 0 301.509576c0 29.833288-24.861074 55.454006-55.523064 55.454006l-123.407607 0 0-47.23604 30.592932 0c13.259239 0 24.032371-10.773132 24.032371-24.032371L1614.450499 542.316698l-90.259509 0 0 179.690316c0 73.754518-13.190181 135.838144-30.592932 177.204208l-122.578905 0c16.574049-40.60642 29.833288-101.861343 29.833288-177.204208L1400.852441 542.316698l-48.824386 0 0 301.509576c0 29.833288-24.032371 55.454006-54.694362 55.454006l-122.509846 0 0-47.23604 30.592932 0c12.430537 0 23.203669-10.773132 23.203669-24.032371L1228.620448 542.316698l-90.328568 0 0 179.690316c0 73.754518-12.499595 135.838144-29.833288 177.204208l-122.578905 0c16.574049-40.60642 29.902347-101.861343 29.902347-177.204208L1015.782034 542.316698l-31.559752 0L984.222282 495.080658zM1138.29188 495.080658l90.328568 0 0-290.736445c0-13.259239-10.773132-24.032371-23.203669-24.032371L1162.255193 180.311842c-14.087942 0-24.032371 10.704073-24.032371 24.032371L1138.222822 495.080658zM1524.260049 495.080658l90.259509 0 0-290.736445c0-13.259239-10.704073-24.032371-24.032371-24.032371l-43.023469 0c-13.190181 0-23.203669 10.704073-23.203669 24.032371L1524.260049 495.080658z" p-id="6626" fill="#d6461e"></path></svg>
        </div>
        <AccountContainerLogin />
      </figure>
    </div>
    <Footer />
    <Background mode="meteor" />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, nextTick, onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import AccountContainerLogin from "@/modules/Account/components/ContainerLogin.vue";
import AccountContainerRegister from "@/modules/Account/components/ContainerRegister.vue";
import Background from '@/components/Background/index.vue'
import Cookie from "js-cookie";
import Api from "@/api";
import { useRoute, useRouter } from "vue-router";
import useCurrentInstance from "@/hooks/useCurrentInstance";
import Store from "@/store";
import { useState } from "@akar/vue-hooks";

const [preLogin, setPreLogin] = useState(2)

</script>

<style lang="scss" scoped>
.user-account-login {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f0f2f5;
  background-image: url("@/assets/images/login-bg.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 1;
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
      background-image: url("@/assets/images/logo-akar.svg");
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
      font-family: serif;
      line-height: 25px;
    }
  }
  .user-account-body {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    .account-card {
      box-shadow: 3px 6px 12px 0px rgba(0, 0, 0, 0.15), 1px 4px 8px 0px rgba(0, 0, 0, 0.15);
      position: absolute;
      right: 80px;
      overflow: hidden;
      .account-card-starter {
        overflow: hidden;
        white-space: nowrap;
        transition: all 0.28s;
        position: absolute;
        right: 0;
        top: 40px;
        transform: translate(30%, -50%);
        padding-right: 28px;
        border-radius: 50%;
        width: 64px;
        height: 64px;
        line-height: 86px;
        background: var(--xs-color-warning-light-3);
        svg {
          transition: all 0.28s;
          margin-left: 10px;
        }
        &:hover {
           svg:nth-of-type(1){
            margin-left: -50px;
          }
          svg:nth-of-type(2){
            margin-left: 40px;
          }
          width: 94px;
          line-height: 90px;
          border-radius: 20px;
          padding-right: 12px;
          transform: translate(20%, -50%);
          background: var(--xs-color-success-light-5);
        }
      }
    }
    @keyframes back {
      0% {
        transform: perspective(1000px) rotateY(180deg);
        z-index: 0;
      }
      49% {z-index: 0;}
      55% {
        transform: perspective(1000px) rotateY(90deg) scale(.9);
        z-index: 1;
      }
      100%{
        transform: perspective(1000px) rotateY(0);
        z-index: 1
      }
    }
    @keyframes just {
      0% {
        transform: perspective(1000px) rotateY(0);
        z-index: 1;
      }
      49% {z-index: 1;}
      55% {
        transform: perspective(1000px) rotateY(-90deg) scale(.9);
        z-index: 0;
      }
      100%{
        transform: perspective(1000px) rotateY(-180deg);
        z-index: 0;
      }
    }
    .back {
      animation: back .52s forwards;
    }
    .just {
      animation: just .52s forwards;
    }
  }
}

@media screen and (max-width: 600px) {
  .account-card {
    width: 90% !important;
    right: 5% !important;
  }
  .user-account-container-layout {
    width: 100%;
    .user-account-nav {
      left: 0;
      right: 0;
      margin: auto;
      justify-content: center;
    }
  }
}
</style>
