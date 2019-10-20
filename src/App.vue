<template>
  <div id="app">
    <div id="nav">
      <van-tabbar v-model="active">
        <van-tabbar-item to="/">首页</van-tabbar-item>
        <van-tabbar-item to="/shop" icon="search">购票</van-tabbar-item>
        <van-tabbar-item to="/movie" icon="setting-o">影院</van-tabbar-item>
        <van-tabbar-item to="/wode" icon="wode">我的</van-tabbar-item>
      </van-tabbar>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
header {
  z-index: 1;
  position: fixed;
  box-sizing: border-box;
  padding: 0 0.3rem;
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    color-stop(0%, #9675bd),
    color-stop(50%, #6b5e79),
    color-stop(100%, #7e9694)
  );

  max-width: 100%;
  min-width: 100%;
  color: #fff;
  height: 0.92rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  height: 0;
}
</style>
