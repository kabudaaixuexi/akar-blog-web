<template>
  <div>
    <header>
      <span></span>
      <span>个人中心</span>
      <span></span>
    </header>
    <section>
      <article class="User"></article>
    </section>
    <van-tabbar v-model="activetag">
      <van-tabbar-item to="/">首页</van-tabbar-item>
      <van-tabbar-item to="/shop" icon="search">购票</van-tabbar-item>
      <van-tabbar-item to="/movie" icon="setting-o">影院</van-tabbar-item>
      <van-tabbar-item to="/wode" icon="wode">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activetag: 3
    };
  },
  created() {
    console.log(this.$store);

    this.$store.commit("Willsold");
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
