<template>
  <div>
    <header>
      <span></span>
      <span>个人中心</span>
      <span></span>
    </header>
    <section>
      <article class="User">
        <p class="User_tou">
          <img src="../assets/goutou.jpg" alt />
        </p>
        <p class="User_font">
          <abbr>clyde🌲</abbr>
          <br />
          <small>15716771475</small>
        </p>
        <p>＜＜👈</p>
      </article>
      <article class="quan">
        <div>
          <p>icon</p>
          <p>我的硬币</p>
        </div>
        <div>
          <p>icon</p>
          <p>电影券</p>
        </div>
        <div>
          <p>icon</p>
          <p>抽奖</p>
        </div>
      </article>

      <article>
        <van-grid :column-num="3">
          <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" />
        </van-grid>
      </article>
      <footer>
        <van-button type="danger" size="large">退出登录</van-button>
      </footer>
    </section>
    <van-tabbar v-model="activetag">
      <van-tabbar-item to="/" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item to="/shop" icon="coupon">购票</van-tabbar-item>
      <van-tabbar-item to="/movie" icon="video">影院</van-tabbar-item>
      <van-tabbar-item to="/wode" icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      activetag: 3,
      Data: ""
    };
  },
  computed: {
    ...mapState({
      print: state => state.print.all
    })
  },
  created() {
    console.log(this.$store);
    console.log(this.print);
    // this.$store.commit("Willsold");
  }
};
</script>
<style scoped>
section {
}
section::before {
  /* background: url(../assets/bg_.jpg);
  background-size: cover;
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0; */
  z-index: -1; /*-1 可以当背景*/
  -webkit-filter: blur(3px);
  filter: blur(3px);
}
.User {
  padding-top: 0.9rem;
  height: 2.5rem;
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 2rem 5fr 2fr;
}
.User_font {
  font-size: 0.4rem;
}
.User_tou img {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}
.quan {
  margin: 0 0 0.2rem 0;
  display: grid;
  grid-template-columns: 1fr [c1] 1fr [c1] 1fr;
  place-items: center;
}
.quan div {
  font-size: 0.34rem;
  text-align: center;
  line-height: 0.5rem;
  padding: 0.1rem;
  display: flex;
  flex-direction: column;
}
.quan div:nth-child(2) {
  width: 100%;
  border-left: 1px solid rgba(114, 113, 108, 0.2);
  border-right: 1px solid rgba(114, 113, 108, 0.2);
}
</style>
