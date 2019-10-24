<template>
  <div>
    <p class="fiexd">
      <van-search @click="aa" placeholder="请输入搜索关键词" background="rgba(250, 250, 250, 0.1)" />
    </p>
    <article class="swipe_">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="../../assets/yellow.jpg" alt />
        </van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </article>

    <article class="now_list">
      <figure v-for="item in Willbuy" @click="Todetail(item.movieId)">
        <img :src="item.img" v-lazy="item.img" alt />
        <div>
          <h4 class="list_title">
            <span>{{item.titleCn}}</span>
            <small>{{item.ratingFinal==-1?"暂无评分":item.ratingFinal}}</small>
          </h4>
          <abbr>{{item.commonSpecial}}</abbr>
          <p
            class="list_date"
          >今日{{item.nearestShowtime.nearestShowtimeCount}}家影院{{item.wantedCount}}场</p>
          <nav class="list_bottom">
            <ul class="list_biao">
              <li>{{item.is3D==false?"中国巨幕":'3D'}}</li>
              <li>&nbsp;{{item.isDMAX==false?"全景声":'DMAX'}}</li>
            </ul>
            <span class="list_xuan">选座购票</span>
          </nav>
        </div>
      </figure>
    </article>
  </div>
</template>
<script>
export default {
  name: "nowsold",
  data() {
    return {
      Willbuy: []
    };
  },
  created() {
    axios
      .post("http://localhost:3000/proxy", {
        url:
          "https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=290"
      })
      .then(res => {
        if (res.statusText === "OK") {
          this.Willbuy = res.data.info.movies;
          console.log(this.Willbuy);
          this.Willbuy.map((item, index) => {});
        }
      });
  },
  mounted() {
    // this.$store.commit("print/setPrint", {
    //   Data: this.Willbuy,
    //   BrandID: 402
    // });
  },
  methods: {
    aa() {
      this.$router.push("/search");
    },
    Todetail(movieId) {
      console.log(movieId);
      this.$router.push({
        name: "detail",
        query: {
          id: movieId
        }
      });
    }
  }
};
</script>
<style scoped>
.fiexd {
  display: flex;
  top: 0;
  background: rgba(250, 250, 202, 0.1);
}
.swipe_ img {
  border-radius: 0.2rem;
  width: 100%;
  height: 3rem;
}
.now_list figure {
  display: flex;
  padding: 0.2rem 0;
  height: 2rem;
  border-bottom: 1px solid rgba(219, 217, 217, 0.2);
}
.now_list figure img {
  height: 100%;
  width: 1.5rem;
  margin-right: 0.3rem;
}
.now_list figure div {
  width: 100%;
}

.list_title {
  display: flex;
  justify-content: space-between;
}
.list_title span {
  font-size: 0.31rem;
}
.list_title small {
  color: darkorchid;
}
.now_list div {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  align-items: center;
}
.now_list div abbr {
  color: blueviolet;
  font-size: 0.24rem;
}
.now_list .list_date {
  font-size: 0.24rem;
  color: rgb(163, 153, 153);
}
.list_bottom {
  display: flex;
  justify-content: space-between;
}
.list_biao {
  display: flex;
  font-size: 0.2rem;
  align-items: center;
}
.list_biao li {
  color: rgb(96, 97, 99);
  display: flex;
  margin-right: 0.02rem;
  align-items: center;
  padding: 0 0.06rem;
  border: 1px solid rgb(95, 95, 97);
  border-radius: 10%;
}
.list_xuan {
  text-align: center;
  line-height: 0.6rem;
  font-size: 0.28rem;
  display: block;
  height: 0.6rem;
  width: 1.6rem;
  color: blueviolet;
  border: 1px solid blueviolet;
  border-radius: 0.1rem;
}
</style>
