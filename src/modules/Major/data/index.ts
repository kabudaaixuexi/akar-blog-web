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
