<template>
  <div>
    <nav class="fade_search">
      <van-search
        @input="searchInput"
        @focus="Focus"
        background
        v-model="searchVal"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
      >
        <div class="sousuo" @click="baibai" slot="action">搜索</div>
      </van-search>
    </nav>
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
 <style scoped>
</style>
