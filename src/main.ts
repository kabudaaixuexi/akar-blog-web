import { createApp } from 'vue'
import App from './App.vue'

import router from '@/router'
import '@/router/permission'

// 注册io
import SocketIo from '@/utils/socket.io'

import ElementPlus from 'element-plus'
import './utils/socket.io'
import Fonts from '@/assets/fonts'
import '@akar/xs-editor/lib/style/common.css'
// import 'vue-baidu-calendar/dist/index.css'
import '@/libs/ckEditor/ckeditor.js'

// 全部函数变量组件
import GlobalComponents from '@/components'
import GlobalFnAndVariable from './global'

// 混入
import Mixin from './mixins'
import Widgets from './widgets'
import BaiduCalendar from "vue-baidu-calendar"

const app = createApp(App)

app
  .use(router)
app
  .use(ElementPlus)
  .use(GlobalComponents)
  .use(GlobalFnAndVariable)
  .use(Widgets)
  .use(SocketIo, {
    connection: import.meta.env.VITE_SOCTKET_API,
    options: {
      autoConnect: true, //关闭自动连接
      // ...其它选项
    },
  })
  .use(BaiduCalendar)
  .use(Fonts)
  .mixin(Mixin)
  .mount('#app')

export default app
