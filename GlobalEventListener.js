export default function GlobalEventListener(event, selector, callback) {
  document.addEventListener(event, e => {
    if (e.target.matches(selector)) callback(e)
  })
}
