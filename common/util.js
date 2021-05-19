// debounce
export function debounce(func, delay) {
  let lastTime = null
  let timeout
  return function () {
    let context = this
    let now = new Date()
    if (now - lastTime - delay > 0) {
      setTimeout(() => {
        func.apply(context, arguments)
      }, delay)
    } else {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      timeout = setTimeout(() => {
        func.apply(context, arguments)
      }, delay)
    }
    lastTime = now
  }
}

// get ScrollTop for most browsers
export function getScrollTop() {
  if (window.pageYOffset) {
    return window.pageYOffset
  } else if (document.documentElement.scrollTop) {
    return document.documentElement.scrollTop
  } else if (document.body.scrolltop) {
    return document.body.scrolltop
  } else {
    return 0
  }
}
