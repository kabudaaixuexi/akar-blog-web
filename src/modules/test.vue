<template>
  <!-- <NavigationSideLogo /> -->
  <div class="">
    test
    {{ count }}
    <button @click="setCount((c) => c.value + 1)">+ 1</button>
    <button @click="setCount((c) => c.value - 1)">- 1</button>
  </div>
  <div>
    {{ count2 }}
    <button @click="countDispatch({ type: 'add', payload: 3 })">add</button>
    <button @click="countDispatch({ type: 'reduce', payload: 3 })">reduce</button>
  </div>
</template>

<script lang="ts" setup>
import NavigationSideLogo from "@/components/Navigation/Side/SideLogo.vue";
// import { useState, useReducer } from "../../../PackagesOfAkar/@akar:vue-hooks/core";
// import { useState, useReducer, useEffect } from "@akar/vue-hooks";
import { useState, useReducer, useEffect } from '@/hooks/base'
const [count, setCount] = useState(0);
const [count2, countDispatch] = useReducer((count, { type, payload }) => {
  switch (type) {
    case "add":
      setTimeout(() => {
        count.value = count.value + payload;
      }, 1000)
      break;
    case "reduce":
      count.value = count.value - payload;
      break;
  }
}, 100);
useEffect(() => {
console.log('csacsacscs,111')
}, [])
</script>
<style lang="scss" scoped>
//@use url(); 引入公共css类
.wrap-user-setting {
}
</style>
