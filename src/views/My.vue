<template>
  <div>
    <header>
      <span></span>
      <span>个人中心</span>
      <span></span>
    </header>
    <section>
      <article class="User"></article>
      <p></p>
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
.User {
  padding-top: 0.9rem;
  height: 3rem;
  background: rgb(10, 17, 17);
  width: 100%;
}
</style>
