<template>
  <div>
    <header>
      <span @click="Go_back">
        <van-icon name="arrow-left" />
      </span>
      <span>预告片</span>
      <span></span>
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    Go_back() {
      this.$router.history.go(-1);
    }
  }
};
</script>
