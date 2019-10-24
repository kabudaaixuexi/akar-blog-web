<template>
  <div>
    <header>
      <span @click="Go_back">
        <van-icon name="arrow-left" />
      </span>
      <span>预告片</span>
      <span></span>
    </header>
    <section>
      <figure v-for="item in 10" class="figure">
        <img src alt />
        <div>
          <p>yvgovvyuvovoyv</p>
          <p>
            <span></span>
            <span></span>
          </p>
        </div>
      </figure>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$store.commit("Willsold");
    this.$store.commit("Yugao");
  },
  methods: {
    Go_back() {
      this.$router.history.go(-1);
    }
  }
};
</script>

<style scoped>
.figure {
  display: flex;
  padding: 0.1rem 0.2rem;
}
.figure img {
  display: block;
  width: 4rem;
  height: 3rem;
}
</style>
