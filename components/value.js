var css = require('dom-css')

module.exports = function (root, opts) {
  opts = opts || {}
  var value = document.createElement('input')
  value.setAttribute('type', opts.type || 'text')

  if (opts.type === 'number') {
    if (opts.min != null) value.min = opts.min
    if (opts.max != null) value.max = opts.max
    if (opts.step != null) value.step = opts.step
    else value.step = (opts.max - opts.min) / 100 || 1
  }

  if (opts.input) {
    value.addEventListener('input', function () {
      opts.input(value.value)
    })
  }
  if (opts.change) {
    value.addEventListener('change', function () {
      opts.change(value.value)
    })
  }

  value.value = opts.initial

  value.id = opts.id || 'control-panel-value-' + opts.uuid
  value.className = 'control-panel-value-' + opts.uuid
  root.appendChild(value)

  var bgcss = {
    width: opts.width
  }

  if (!opts.left) {
    bgcss.right = 0
  }

  css(value, bgcss)

  return value
}
