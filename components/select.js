var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var isnumeric = require('is-numeric')
var css = require('dom-css')

module.exports = Select
inherits(Select, EventEmitter)

function Select (root, opts, theme, uuid) {
  if (!(this instanceof Select)) return new Select(root, opts, theme, uuid)
  var self = this

  var container = require('./container')(root, opts.label)
  require('./label')(container, opts.label, theme)

  var input = document.createElement('select')
  input.className = 'control-panel-select-' + uuid + '-dropdown'

  var downTriangle = document.createElement('span')
  downTriangle.className = 'control-panel-select-' + uuid + '-triangle control-panel-select-' + uuid + '-triangle--down'

  var upTriangle = document.createElement('span')
  upTriangle.className = 'control-panel-select-' + uuid + '-triangle control-panel-select-' + uuid + '-triangle--up'

  container.appendChild(downTriangle)
  container.appendChild(upTriangle)

  if (Array.isArray(opts.options)) {
    for (var i = 0; i < opts.options.length; i++) {
      var option = opts.options[i]
      var el = document.createElement('option')
      el.value = el.textContent = option
      if (opts.initial === option) {
        el.selected = 'selected'
      }
      input.appendChild(el)
    }
  } else {
    var keys = Object.keys(opts.options)
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      var el = document.createElement('option')
      el.value = key
      if (opts.initial === key) {
        el.selected = 'selected'
      }
      el.textContent = opts.options[key]
      input.appendChild(el)
    }
  }

  container.appendChild(input)

  input.onchange = function (data) {
    self.emit('input', data.target.value)
  }
}
