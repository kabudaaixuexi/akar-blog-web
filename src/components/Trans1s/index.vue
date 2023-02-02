<template>
  <section class="trans">
    <div id="frame" :class="`cp ${active ? 'active' : ''}`">
        <div id="inner-frame" @click="changeT">
            <div :class="`cloud animate-cloud trans1s ${active ? 'active' : ''}`"></div>
            <div :class="`cloud trans1s ${active ? 'active' : ''}`" id="right-side"></div>
            <div id="moon" :class="`trans1s ${active ? 'active' : ''}`"></div>
            <div id="water" :class="`trans1s ${active ? 'active' : ''}`"></div>
            <div id="island" :class="`trans1s ${active ? 'active' : ''}`"></div>
            <div id="island-shadow" :class="`trans1s ${active ? 'active' : ''}`"></div>
        </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useState } from "@akar/vue-hooks";
import Store from "@/store";

const [active, setActive] = useState(Store.getState('theme') !== 'dark')

const initTheme = () => {
  document.body.className = Store.getState('theme') || 'light'
}
const changeT = () => {
  const theme = document.body.className
  const newTheme = theme === 'light' ? 'dark' : 'light'
  document.body.className = newTheme;
  setActive(!active.value)
  Store.setState(newTheme, 'theme')
}
initTheme()
</script>

<style lang="scss">
.trans {
  font-size: 3.2px;
}
.trans1s {
    -webkit-transition: all 1s ease-in-out;
    transition: all 1s ease-in-out;
    /* ---------- FRAME ---------- */
}
#frame {
    z-index: 1;
    overflow: hidden;
    position: relative;
    width: 19em;
    height: 15em;
    padding: 3em;
    background-image: linear-gradient(to bottom, rgb(113, 111, 111) , #fff);
}
#frame:after {
    position: absolute;
    content: '';
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-shadow:0 0 1em 2em var(--bgColor_Header) inset;
    transition: all 1s;
}
#frame.active {
  background-image: linear-gradient(to bottom, rgb(187, 240, 244) , #fff);
}
#inner-frame {
    height: 100%;
    width: 100%;
    /* ---------- CLOUD ---------- */
}
.cloud {
    position: absolute;
    left: 10%;
    bottom: 60%;
    width: 7em;
    height: 1.8em;
    border-radius: 1.5em;
    box-shadow:0 0 .7em .4em #b3b1b1 inset;
    background-color: #555454;
    -webkit-animation: showLeft 1.5s ease-in-out 1;
    animation: showLeft 1.5s ease-in-out 1;
}
@-webkit-keyframes showLeft {
    0% {
        left: -200%;
    }
}
@keyframes showLeft {
    0% {
        left: -200%;
    }
}
@-webkit-keyframes floating {
    0% {
        top: 0.5em;
        right: 1em;
    }
    50% {
        top: 0em;
        right: -1em;
    }
}
@keyframes floating {
    0% {
        margin-left: -300%;
    }
    0% {
        margin-left: -300%;
    }
}
#right-side {
    z-index: -3;
    left: 50%;
    bottom: 55%;
}
#right-side.active {
    left: 100%;
}
.cloud.active {
    left: -40%;
    transition: all .6s;
    background-color: #e4dfdf;
    box-shadow:0 0 .7em .4em #e4dfdf inset;
    /* ---------- MOON/SUN ---------- */
}
#moon {
    margin-left: 7em;
    margin-top: -2.4em;
    width: 3em;
    height: 3em;
    border-radius: 50%;
    box-shadow: .8em .8em 0 0 rgb(215, 212, 212);
    -webkit-animation: moonGrow 1.5s ease-in-out 1;
    animation: moonGrow 1.5s ease-in-out 1;
}
@-webkit-keyframes moonGrow {
    0% {
        box-shadow: 0px 0px 0 0 #1a1a1a;
    }
}
@keyframes moonGrow {
    0% {
        box-shadow: 0px 0px 0 0 #1a1a1a;
    }
}
#moon.active {
    box-shadow: 3em 3em 0 0 #f9bf3b;
    /* ---------- WATER ---------- */
}
#water {
    position: absolute;
    z-index: -1;
    bottom: -18%;
    left: -17%;
    height: 50%;
    width: 130%;
    background-color: #111;
    -webkit-animation: appearWater 1.75s ease-in-out 1;
    animation: appearWater 1.75s ease-in-out 1;
}
#water.active {
    background-color: #52b3d9;
}
@-webkit-keyframes appearWater {
    0%, 50% {
        -webkit-transform: rotate(6deg);
        transform: rotate(6deg);
        bottom: -60%;
    }
    75% {
        -webkit-transform: rotate(-6deg);
        transform: rotate(-6deg);
        bottom: 0%;
    }
    90% {
        -webkit-transform: rotate(3deg);
        transform: rotate(3deg);
    }
    95% {
        -webkit-transform: rotate(-1deg);
        transform: rotate(-1deg);
    }
    100% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        bottom: -20%;
    }
}
@keyframes appearWater {
    /* ---------- ISLAND ---------- */

    0%, 50% {
        -webkit-transform: rotate(6deg);
        transform: rotate(6deg);
        bottom: -60%;
    }
    75% {
        -webkit-transform: rotate(-6deg);
        transform: rotate(-6deg);
        bottom: 0%;
    }
    90% {
        -webkit-transform: rotate(3deg);
        transform: rotate(3deg);
    }
    95% {
        -webkit-transform: rotate(-1deg);
        transform: rotate(-1deg);
    }
    100% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        bottom: -20%;
    }
}
#island {
    z-index: -2;
    position: absolute;
    right: 0;
    left: 0;
    margin-right: auto;
    margin-left: auto;
    bottom: 30%;
    width: 0;
    height: 0;
    border-left: 5em solid transparent;
    border-right: 5em solid transparent;
    border-bottom: 5em solid #222;
    -webkit-animation: up 1.5s ease-in-out 1;
    animation: up 1.5s ease-in-out 1;
}
#island.active {
    border-bottom: 5em solid #26a65b;
}
@-webkit-keyframes up {
    0%, 50% {
        bottom: -30%;
    }
    100% {
        bottom: 30%;
    }
}
@keyframes up {
    /* ---------- ISLAND SHADOW ---------- */

    0%, 50% {
        bottom: -30%;
    }
    100% {
        bottom: 30%;
    }
}
#island-shadow {
    position: absolute;
    opacity: 0.1;
    z-index: -1;
    width: 0;
    height: 0;
    right: 0;
    left: 0;
    bottom: -8%;
    margin-right: auto;
    margin-left: auto;
    border-left: 6em solid transparent;
    border-right: 3em solid transparent;
    border-bottom: 2em solid #2e2d2d;
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
    -webkit-animation: opaque 3s ease-in-out 1;
    animation: opaque 3s ease-in-out 1;
}
#island-shadow.active {
    border-bottom: 6em solid #fff;
}
@-webkit-keyframes opaque {
    75% {
        opacity: 0;
    }
    100% {
        opacity: 0.1;
    }
}
@keyframes opaque {
    /* ---------- BUTTON ---------- */

    75% {
        opacity: 0;
    }
    100% {
        opacity: 0.1;
    }
}
</style>
