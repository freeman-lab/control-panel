var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var css = require('dom-css')

module.exports = Button
inherits(Button, EventEmitter)

function Button (root, opts, theme, uuid) {
  if (!(this instanceof Button)) return new Button(root, opts, theme, uuid)

  var container = require('./container')(root, opts.label, opts.help)
  require('./label')(container, '', theme)

  var input = container.appendChild(document.createElement('button'))
  input.className = 'control-panel-button-' + uuid

  input.onfocus = function () {
    css(input, {outline: 'none'})
  }

  input.textContent = opts.label

  css(input, {
    position: 'absolute',
    textAlign: 'center',
    height: '2em',
    width: '64%',
    border: 'none',
    cursor: 'pointer',
    right: 0,
    fontFamily: 'inherit'
  })

  input.addEventListener('click', opts.action)
}
