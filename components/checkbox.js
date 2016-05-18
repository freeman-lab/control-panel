var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var uuid = require('node-uuid')

module.exports = Checkbox
inherits(Checkbox, EventEmitter)

function Checkbox (root, opts, theme, uuid) {
  if (!(this instanceof Checkbox)) return new Checkbox(root, opts, theme, uuid)
  opts = opts || {}
  var self = this

  var container = require('./container')(root, opts.label)
  require('./label')(container, opts.label, theme)

  var input = container.appendChild(document.createElement('input'))
  input.id = 'checkbox-' + opts.label + uuid
  input.type = 'checkbox'
  input.checked = opts.initial
  input.className = 'control-panel-checkbox-' + uuid

  var label = container.appendChild(document.createElement('label'))
  label.htmlFor = 'checkbox-' + opts.label + uuid
  label.className = 'control-panel-checkbox-' + uuid

  setTimeout(function () {
    self.emit('initialized', input.checked)
  })

  input.onchange = function (data) {
    self.emit('input', data.target.checked)
  }
}
