<template>
  <div class="about">
    <header></header>
    <van-search
      @input="searchInput"
      @focus="Focus"
      background
      v-model="searchVal"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
    >
      <div @click="baibai" slot="action">搜索</div>
    </van-search>
    <section>
      <figure class="Movie_bo">
        <p class="Movie_top">
          <abbr>慕华国际影院（按停电）</abbr>
          <span>
            <span class="Peekpink">45.5</span>
            <small>元起</small>
          </span>
        </p>
        <p class="Movie_con">检查萨巴赫从撒查出撒</p>
        <p class="Movie_bottom">
          <span>
            <abbr>2D</abbr>
            <abbr>3D</abbr>
          </span>
          <span></span>
        </p>
      </figure>

      <p>{{searchlist}}</p>
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
import { log } from "util";
import { mapState } from "vuex";
export default {
  data() {
    return {
      activetag: 2,
      searchVal: "",
      searchlist: []
    };
  },
  created() {
    this.$store.commit("Yugao");
  },
  mounted() {},
  computed: mapState(["List"]),
  methods: {
    searchInput() {
      this.searchlist = [];
      this.List.data.info.movies.forEach(item => {
        if (item.titleCn.indexOf(this.searchVal) != -1) {
          this.searchlist.push(item);
          if (this.searchVal.length == 0) {
            this.searchlist = [];
          }
        }
      });
    },
    Focus() {},
    baibai() {}
  }
};
</script>
 <style scoped>
.van-search {
  width: 100%;
  z-index: 2;
  position: fixed;
  top: 0.96rem;
  padding: 0.1rem;
}
section {
  padding-top: 2rem;
}
.Movie_bo {
  height: 2.1rem;
  width: 100%;
  align-items: center;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  border-bottom: 0.005rem solid rgba(87, 84, 84, 0.5);
}
.Movie_top {
  display: flex;
  justify-content: space-between;
}
.Movie_top abbr {
  font-size: 0.38rem;
}
.Movie_top span {
  font-size: 0.32rem;
}
.Peekpink {
  color: rgb(113, 24, 136);
}
.Movie_con {
  font-size: 0.3rem;
  color: rgb(129, 126, 126);
}
.Movie_bottom {
  font-size: 0.26rem;
}
.Movie_bottom abbr {
  padding: 0 0.1rem;
  border: 1px solid rgb(175, 175, 184);
  border-radius: 10%;
  margin-right: 0.1rem;
}
</style>
