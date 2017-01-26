var css = require('dom-css')
var format = require('param-case')

module.exports = function (root, label, help) {
  var container = root.appendChild(document.createElement('div'))
  container.id = 'control-panel-' + format(label)
  container.className = 'control-panel-container'
  css(container, {
    position: 'relative',
    minHeight: '2em',
    lineHeight: '1.5',
    marginBottom: '.5em'
  })
  if (help) container.setAttribute('data-help', help)
  return container
}
