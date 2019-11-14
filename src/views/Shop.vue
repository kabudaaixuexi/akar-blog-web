<template>
  <div>
    <header class="header">
      <p v-model="active">
        <span>
          <router-link to="/shop/now">正在售票</router-link>
        </span>
        <span>
          <router-link to="/shop/will">即将上映</router-link>
        </span>
      </p>

      <van-tabbar v-model="activetag">
        <van-tabbar-item to="/" icon="wap-home">首页</van-tabbar-item>
        <van-tabbar-item to="/shop" icon="coupon">购票</van-tabbar-item>
        <van-tabbar-item to="/movie" icon="video">影院</van-tabbar-item>
        <van-tabbar-item to="/wode" icon="manager">我的</van-tabbar-item>
      </van-tabbar>
    </header>
    <section class="con_">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </section>
  </div>
</template>
<script>
export default {
  name: "shop",
  data() {
    return {
      activetag: 1,
      active: 0
    };
  }
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: center;
}
.header p {
  width: 3.6rem;
  border: 1px solid #fff;
  height: 80%;
  border-radius: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.header p a {
  color: #fff;
}
.header p span {
  font-size: 0.28rem;
  display: grid;
  place-items: center;
}
.header p span:nth-child(1) {
  border-right: 1px solid #fff;
}

.con_ {
  padding-top: 0.9rem;
}
</style>
1
