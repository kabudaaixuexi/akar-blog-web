<template>
  <div>
    <header>
      <span @click="Go_back">
        <van-icon name="arrow-left" />
      </span>
      <span></span>
      <span></span>
    </header>
    <article class="header">
      <span>
        <van-icon name="cross" />
      </span>
    </article>
    <section class="con">
      <article class="con-1">
        <div>
          用户名：
          <input v-model="username" type="text" />
          <hr style="background:#333;margin-top:0.4rem;opacity:.1;height:0.02rem;border:none" />
        </div>
        <div>
          密码：
          <input v-model="password" class="yanzheng" type="password" @keyup.enter="signin()" />
          <hr style="background:#333;margin-top:0.4rem;opacity:.1;height:0.02rem;border:none" />
        </div>
      </article>
      <article class="con-2">
        <button @click="signin()" class="signin">登录</button>
        <span>没有账号？前往注册</span>
      </article>
      <article class="con-3">
        <p>快捷登录</p>
        <p>
          登录代表您已同意
          <span>《影院通服务协议》</span>
        </p>
        <div>
          <span @click="xixi" class="iconfont icon-weixin"></span>
          <span @click="xixi" class="iconfont icon-qq02"></span>
          <span @click="xixi" class="iconfont icon-weibo"></span>
        </div>
      </article>
    </section>
  </div>
</template>
<script>
// import { Toast } from "mint-ui";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    Go_back() {
      this.$router.history.go(-1);
    },
    signin() {},
    xixi() {
      Toast("该功能暂未开发");
    }
  }
};
</script>
<style scoped>
.header {
  height: 3.64rem;
  /* background: url(../assets/3的副本@2x.png) no-repeat; */
  background-size: 100%;
  padding-top: 0.4rem;
  box-sizing: border-box;
}
.header span {
  font-size: 0.36rem;
  color: #fefffe;
  margin-left: 0.36rem;
}

.con {
  padding: 0.66rem 0.72rem 0 0.68rem;
  background: #fff;
}
.con-1 {
  height: 2.5rem;
  display: grid;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  font-size: 0.28rem;
  color: #333;
  font-family: Arial, Helvetica, sans-serif;
  opacity: 0.8;
}
.con-1 input {
  border: none;
  outline: none;
}
.yanzheng {
  width: 2.3rem;
}
.btn {
  font-size: 0.24rem;
  background: #fff;
  color: rgba(51, 51, 51, 0.5);
  width: 1.94rem;
  height: 0.58rem;
  border-radius: 0.08rem;
  border: solid 0.02rem rgba(51, 51, 51, 0.5);
}

.con-2 {
  height: 1.44rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 1.1rem;
}
.signin {
  font-size: 0.28rem;
  color: #fff;
  border: none;
  width: 100%;
  height: 0.8rem;
  background-color: rgba(51, 51, 51, 0.6);
  border-radius: 0.08rem;
}
.con-2 span {
  font-size: 0.24rem;
  color: rgba(51, 51, 51, 0.5);
}

.con-3 {
  margin-top: 1.5rem;
  height: 1.32rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0 0.2rem 0;
}
.con-3 p {
  text-align: center;
  font-size: 0.28rem;
  color: #333;
  opacity: 0.6;
}
.con-3 div {
  display: flex;
  justify-content: space-between;
  opacity: 0.6;
}
.con-3 span::before {
  font-size: 0.4rem;
  color: #333;
}
</style>
