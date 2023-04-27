// Vue Component Install

import { App } from 'vue'
import IconFont from '@/components/IconFont/index.vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue'
import LayoutArea from '@/components/Layout/LayoutArea.vue'
import LayoutSection from '@/components/Layout/LayoutSection.vue'
import Footer from '@/components/Footer/index.vue'
import Background from '@/components/Background/index.vue'

import CkEditor from './webComonents/CkEditor'

const Components = {
  install (app: App<any>) {
    // 注册全局通用组件
    globalComponentList.forEach((Comp) => {
      app.component(Comp.name, Comp)
    })
    // 注册webComponents
    webComponentList.forEach((register) => register())
  }
}

const globalComponentList = [
  IconFont,
  Tooltip,
  LayoutArea,
  LayoutSection,
  Footer,
  Background
]

const webComponentList = [
  CkEditor
]

export default Components
