<template>
  <article class="aboutinfo-container BgColor_Content Color_Content">
      <header class="aboutinfo-container__header">
        <figcaption @click="handleChange(item.value)" :class="`${(currentDrawe || 0) == item.value ? 'current': ''}`" v-for="(item, i) in [
            {
              label: 'TA的关注',
              value: 'follow',
            },
            {
              label: 'TA的粉丝',
              value: 'fans',
            },
          ]" :key="i">
        {{item.label}}
      </figcaption>
      </header>
      <div v-empty="''" class="aboutinfo-container__box">
        <nav class="aboutinfo-container__user" v-for="({uid, userName, userPortrait, userIntro}) in currentList" :key="uid">
          <img @click="() => handleClick(uid)" v-if="userPortrait" :src="userPortrait" />
          <img @click="() => handleClick(uid)" v-else src="@/assets/images/navigation-avatar.webp" />
          <figure>
            <figcaption><strong>{{ userName }}</strong></figcaption>
            <figcaption class="c666 otw f12 mt4"><small>{{ userIntro || ' ' }}</small></figcaption>
          </figure>
        </nav>
      </div>
  </article>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { useState } from '@akar/vue-hooks';
import { useRouter } from 'vue-router';

const props: any = defineProps<{
  user: {},
}>()

const router = useRouter()
const [currentDrawe, setCurrentDrawe] = useState('')
const [currentList, setCurrentList] = useState([])

const handleClick = (uid) => {
  handleChange('follow')
  router.push(`/uf/${uid}/hp`)
}
const handleChange = (type) => {
  setCurrentDrawe(type)
  setCurrentList([...(JSON.parse(props.user.extData || '{}')[type] || [])])
}

watch(
  () => props.user,
  (val) => { handleChange('follow') },
  {
    immediate: true,
  }
);

</script>

<style lang="scss" scoped>
.aboutinfo-container {
width: 100%;
height: 40%;
border-radius: 6px;
overflow: hidden;
margin-bottom: 12px;
box-shadow: 0 0 1px 0 var(--shadowColor_Content);
&__box {
  height: 100%;
  max-height: 100%;
  overflow-y: scroll;
}
&__header {
  background: var(--el-color-primary-light-9);
  figcaption {
    transition: all .2s;
    display: inline-block;
    height: 100%;
    line-height: 48px;
    padding: 0 24px;
    font-size: 12px;
    font-weight: 500;
    font-family: 'Courier New', Courier, monospace;
    cursor: pointer;
    &:hover {
      color: var(--el-color-primary);
    }
  }
  .current {
      color: var(--el-color-primary);
  }
}
&__user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px 12px 12px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f6f6f6;
    cursor: pointer;
  }
  figure {
    flex: 1;
    height: 100%;
    padding: 0 12px;
    display: flex;
    flex-direction: column;
  }
}
}
</style>
