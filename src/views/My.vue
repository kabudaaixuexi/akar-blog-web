<template>
  <div>
    11
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
  }
};
</script>
