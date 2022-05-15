import { createApp } from 'vue'

import router from '@/router'
import '@/router/permission'

import store from '@/store'

import App from './App.vue'

import ElementPlus from 'element-plus'

import Fonts from '@/assets/fonts'
import '@akar/xs-editor/lib/style/common.css'


import GlobalComponents from '@/components'
import Mixin from './mixins'
import Widgets from './widgets'

const app = createApp(App)

app
  .use(router)
app
  .use(ElementPlus)
  .use(GlobalComponents)
  .use(Widgets)
  .use(Fonts)
  .mixin(Mixin)
  .mount('#app')

export default app
