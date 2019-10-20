<template>
  <div>
    <van-search id="text" placeholder="请输入搜索关键词" v-model="value" />
  </div>
</template>
<script>
export default {
  name: "search",
  data() {
    return {
      value: ""
    };
  },
  mounted() {
    window.setTimeout(function() {
      window.self.focus();
      document.getElementById("text").focus();
    }, 100);
  }
};
</script>
