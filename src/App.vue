<template>
  <div id="app">
    <div id="nav"></div>

    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  watch: {
    $route() {
      // console.log(this.active);
      // console.log(this.$route.name);
      if (this.$route.name == "shop") {
        this.active = 1;
      } else if (this.$route.name == "movie") {
        this.active = 2;
      } else if (this.$route.name == "wode") {
        this.active = 3;
      }
    }
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

section {
  background: rgba(204, 202, 202, 0.2);
  padding: 0.001rem 0.3rem 55px;
}

header {
  font-size: 0.34rem;
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
  height: 0.98rem;
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
