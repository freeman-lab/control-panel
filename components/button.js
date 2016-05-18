var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var css = require('dom-css')

module.exports = Button
inherits(Button, EventEmitter)

function Button (root, opts, theme) {
  if (!(this instanceof Button)) return new Button(root, opts, theme)
  var self = this

  var container = require('./container')(root, opts.label)
  require('./label')(container, '', theme)

  var input = container.appendChild(document.createElement('button'))
  input.className = 'control-panel-button'

  input.onfocus = function () {
    css(input, {outline: 'none'})
  }

  input.textContent = opts.label;

  css(input, {
    position: 'absolute',
    textAlign: 'center',
    height: '20px',
    width: '62%',
    border: 'none',
    cursor: 'pointer',
    right: 0
  })

  input.addEventListener('click', opts.action);
}
