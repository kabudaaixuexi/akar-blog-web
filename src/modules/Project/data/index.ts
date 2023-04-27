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

export const editorMap = [
  {
    label: 'AKAR_Editor（富文本）',
    value: 'xseditor'
  },
  {
    label: 'CK_Editor（富文本）',
    value: 'ckeditor'
  }
]
