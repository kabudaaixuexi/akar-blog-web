<template>
  <div>
    <header class="header">
      <p>
        <span>影院</span>
        <span>电影</span>
      </p>
    </header>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: center;
}
.header p {
  width: 3.6rem;
  border: 1px solid #fff;
  height: 80%;
  border-radius: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.header p span {
  display: grid;
  place-items: center;
}
.header p span:nth-child(1) {
  border-right: 1px solid #fff;
}
</style>
