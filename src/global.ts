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
  }
}
