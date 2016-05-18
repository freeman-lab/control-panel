var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var css = require('dom-css')

module.exports = Text
inherits(Text, EventEmitter)

function Text (root, opts, theme) {
  if (!(this instanceof Text)) return new Text(root, opts, theme)
  var self = this

  var container = require('./container')(root, opts.label)
  require('./label')(container, opts.label, theme)

  var input = container.appendChild(document.createElement('input'))
  input.type = 'text'
  input.className = 'control-panel-text'
  if (opts.initial) input.value = opts.initial

  input.onfocus = function () {
    css(input, {outline: 'none'})
  }

  css(input, {
    position: 'absolute',
    paddingLeft: '6px',
    height: '20px',
    width: '59.5%',
    border: 'none',
    background: theme.background2,
    color: theme.text2
  })

  setTimeout(function () {
    self.emit('initialized', input.value)
  })

  input.oninput = function (data) {
    self.emit('input', data.target.value)
  }
}
