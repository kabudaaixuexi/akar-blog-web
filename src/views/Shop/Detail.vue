<template>
  <div id="bg">
    <header>
      <span @click="History_go">
        <van-icon name="arrow-left" />
      </span>
      <span>影院通</span>
      <span></span>
    </header>

    <article class="video"></article>
    <article class="juqing"></article>
    <article class="yanyuan"></article>
    <figure class="juPhoto"></figure>
    <section class="pinlun"></section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: ""
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    console.log(this.id);

    axios
      .post("http://localhost:3000/proxy", {
        url: `https://ticket-api-m.mtime.cn/movie/detail.api?locationId=290&movieId=${this.id}`
      })
      .then(res => {
        const data = res.data.info.data;
        const zy = data.actors;
      });
  },
  methods: {
    History_go() {
      this.$router.history.go(-1);
    }
  }
};
</script>
<style  scoped>
#bg {
  width: 100%;
  height: 100%;
  background: url(../../assets/yellow.jpg);
}
</style>
