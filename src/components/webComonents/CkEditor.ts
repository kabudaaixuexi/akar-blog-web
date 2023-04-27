import { createVNode } from 'vue'

class CkEditor extends HTMLElement {
  constructor () {
    super()
    const shadowDom = document.createElement("section").attachShadow({mode: "open"})
    shadowDom.innerHTML = '112221122112'
  }
}

export default () => {
  // const shadowDom = (window as any).attachShadow({mode: "open"})
  window.customElements.define('ck-editor', CkEditor)
  // shadowDom.appendChild(template.content.cloneNode(true))
}
