<script setup lang="ts">
import { ref } from "vue";
type Mode = 'none' | 'meteor' | '' | ''
defineProps<{ mode: Mode }>();

</script>

<template>
  <article v-if="mode === 'meteor'" class="index-bg">
    <div class="stars">
      <div class="star"></div>
      <div
        class="star"
        style="top: 80px; left: 800px; animation-delay: 3s"
      ></div>
      <div
        class="star"
        style="top: 40px; left: 646px; animation-delay: 2s"
      ></div>
      <div
        class="star"
        style="top: 120px; left: 395px; animation-delay: 4s"
      ></div>
      <div
        class="star"
        style="top: 160px; left: 765px; animation-delay: 1s"
      ></div>
      <div
        class="star"
        style="top: 170px; left: 1200px; animation-delay: 2s"
      ></div>
      <div
        class="star"
        style="top: 200px; left: 1000px; animation-delay: 1s"
      ></div>
    </div>
  </article>
</template>

<style scoped>
@-webkit-keyframes star-opacity {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes star-opacity {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-webkit-keyframes star-pos {
  0% {
    transform: scale(0) rotate(0) translate3d(0, 0, 0);
    -webkit-transform: scale(0) rotate(0) translate3d(0, 0, 0);
    -moz-transform: scale(0) rotate(0) translate3d(0, 0, 0);
  }
  100% {
    transform: scale(1) rotate(0) translate3d(-450px, 450px, 0);
    -webkit-transform: scale(1) rotate(0) translate3d(-450px, 450px, 0);
    -moz-transform: scale(1) rotate(0) translate3d(-450px, 450px, 0);
  }
}
@keyframes star-pos {
  0% {
    transform: scale(0) rotate(0) translate3d(0, 0, 0);
    -webkit-transform: scale(0) rotate(0) translate3d(0, 0, 0);
    -moz-transform: scale(0) rotate(0) translate3d(0, 0, 0);
  }
  100% {
    transform: scale(1) rotate(0) translate3d(-450px, 450px, 0);
    -webkit-transform: scale(1) rotate(0) translate3d(-450px, 450px, 0);
    -moz-transform: scale(1) rotate(0) translate3d(-450px, 450px, 0);
  }
}
.index-bg {
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  /* background: linear-gradient(to right bottom, transparent, rgba(0,0,0,0.5));; */
}
.index-bg .stars {
  height: 0;
}
.index-bg .star {
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #fff;
  top: 100px;
  left: 400px;
  position: relative;
  -webkit-transform-origin: 100% 0;
  transform-origin: 100% 0;
  -webkit-animation: star-opacity 5s infinite ease-in,
    star-pos 5s infinite ease-in;
  animation: star-opacity 5s infinite ease-in, star-pos 5s infinite ease-in;
  -webkit-box-shadow: 0 0 5px 5px rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 5px 5px rgba(255, 255, 255, 0.3);
  opacity: 0;
  z-index: 2;
}
.index-bg .star:after {
  content: "";
  display: block;
  top: 0;
  left: 4px;
  border: 0 solid #fff;
  border-width: 0 90px 2px;
  border-color: transparent transparent transparent rgba(255, 255, 255, 0.3);
  -webkit-transform: rotate(-45deg) translate3d(1px, 3px, 0);
  transform: rotate(-45deg) translate3d(1px, 3px, 0);
  -webkit-box-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.1);
  -webkit-transform-origin: 0% 100%;
  transform-origin: 0% 100%;
}
</style>
