import createStore from '@akar/proxy-property'

export default createStore({
  default: 'akar',
  noteClassify: [
    {
      label: '不设置分类',
      value: 0,
      disabled: false
    },
    {
      label: '前端开发',
      value: 1,
      disabled: false
    },
    {
      label: '全栈技术',
      value: 2,
      disabled: false
    },
    {
      label: '面试面经',
      value: 3,
      disabled: false
    },
    {
      label: '小程序',
      value: 4,
      disabled: false
    },
    {
      label: '移动开发',
      value: 5,
      disabled: false
    },
    {
      label: 'Python',
      value: 6,
      disabled: false
    },
    {
      label: '数据库管理',
      value: 7,
      disabled: false
    },
    {
      label: '开源',
      value: 8,
      disabled: false
    },
    {
      label: '非IT技术',
      value: 9,
      disabled: false
    }
  ]
}, {
    usePersisted: true
})

