var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var format = require('param-case')

module.exports = Checkbox
inherits(Checkbox, EventEmitter)

function Checkbox (root, opts, theme, uuid) {
  if (!(this instanceof Checkbox)) return new Checkbox(root, opts, theme, uuid)
  opts = opts || {}
  var self = this

  var id = 'checkbox-' + format(opts.label) + '-' + uuid

  var container = require('./container')(root, opts.label, opts.help)
  require('./label')(container, opts.label, theme, id)

  var input = container.appendChild(document.createElement('input'))
  input.id = id
  input.type = 'checkbox'
  input.checked = opts.initial
  input.className = 'control-panel-checkbox-' + uuid

  var label = container.appendChild(document.createElement('label'))
  label.htmlFor = id
  label.className = 'control-panel-checkbox-' + uuid

  setTimeout(function () {
    self.emit('initialized', input.checked)
  })

  input.onchange = function (data) {
    self.emit('input', data.target.checked)
  }
}
