<template>
  <div>
    <p class="fiexd">
      <van-search
        @click="aa"
        placeholder="请输入搜索关键词"
        background="rgba(250, 250, 250, 0.1)"
        v-model="value"
      />
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
      <figure v-for="item in moviecomings" @click="Todetail(item.id)">
        <img :src="item.image" alt v-lazy="item.image" />
        <div>
          <h4 class="list_title">
            <span>{{item.title}}</span>
            <small>{{item.wantedCount}}人想看</small>
          </h4>
          <abbr>❀《航海王》动画二十周年纪念制作</abbr>
          <p>{{item.releaseDate}}</p>
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
      value: "",
      moviecomings: []
    };
  },

  mounted() {
    axios
      .post("http://localhost:3000/proxy", {
        url: "https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=290"
      })
      .then(res => {
        this.moviecomings = res.data.info.moviecomings;
        console.log(this.moviecomings);
        this.moviecomings.sort((n1, n2) => {
          if (n1.wantedCount > n2.wantedCount) {
            return -1;
          } else if (n1.wantedCount < n2.wantedCount) {
            return 1;
          } else {
            return 0;
          }
        });
      });
  },
  methods: {
    aa() {
      this.$router.push("/search");
    },
    Todetail(id) {
      this.$router.push({
        name: "detail",
        query: {
          id
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
.list_title small {
  color: darkorchid;
  line-height: 0.7rem;
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
.now_list p {
  color: rgb(165, 161, 161);
  font-size: 0.28rem;
}
</style>
