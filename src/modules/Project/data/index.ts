export const creatEmptyVNode = () => {
  return {
      children: [],
      _data: {
          contenteditable: "true",
          allowdrop: "true",
          class: `notepad_sidebar_cont`
      },
      _tag: "article",
      _type: 1,
      _value: undefined
  }
}


export const draweOptions =[
  {
    label: '不设置分类',
    value: 0,
    disabled: false
  },
  {
    label: 'vue',
    value: 1,
    disabled: false
  },
  {
    label: 'react',
    value: 2,
    disabled: false
  },
  {
    label: '面试宝典',
    value: 3,
    disabled: false
  },
  {
    label: 'js',
    value: 4,
    disabled: false
  },
  {
    label: '移动开发',
    value: 5,
    disabled: false
  },
  {
    label: 'node',
    value: 6,
    disabled: false
  }
]
