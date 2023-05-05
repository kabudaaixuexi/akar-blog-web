const emptyImg = require('@/assets/images/v_empty.png')
export default {
  install(app) {
    app.directive('publicSrc', {
        created(el, binding) {
            el.src = import.meta.env.VITE_BASE_API + binding.value
        },
    });
    app.directive('publicHref', {
        created(el, binding) {
            el.link = import.meta.env.VITE_BASE_API + binding.value
        },
    });
    app.directive('empty', {
      updated(el, binding) {
          if (!el.innerHTML) {
            const empty = document.createElement('article')
            empty.id = 'v_empty'
            empty.innerHTML = `<img src="${emptyImg}" />`
            el.appendChild(empty)
          } else {
            document.getElementById('v_empty') && el.removeChild(document.getElementById('v_empty'))
          }
      },
  });
  }
}
