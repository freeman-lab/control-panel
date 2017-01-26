var EventEmitter = require('events').EventEmitter
var ColorPicker = require('simple-color-picker')
var inherits = require('inherits')
var css = require('dom-css')
var tinycolor = require('tinycolor2')
var formatParam = require('param-case')

module.exports = Color
inherits(Color, EventEmitter)

function Color (root, opts, theme, uuid) {
  if (!(this instanceof Color)) return new Color(root, opts, theme, uuid)
  opts = opts || {}
  opts.format = opts.format || 'rgb'
  opts.initial = opts.initial || '#123456'
  var self = this

  var id = 'control-panel-color-value-' + formatParam(opts.label) + '-' + uuid

  var container = require('./container')(root, opts.label, opts.help)
  require('./label')(container, opts.label, theme, id)

  var icon = container.appendChild(document.createElement('span'))
  icon.id = 'control-panel-color-' + uuid
  icon.className = 'control-panel-color-' + uuid

  var value = require('./value')(container, {
    initial: '',
    theme: theme,
    width: '50%',
    uuid: uuid,
    id: id,
    change: function (v) {
      picker.setColor(v)
    }
  })

  icon.onmouseover = function () {
    picker.$el.style.display = ''
  }

  var initial = opts.initial
  switch (opts.format) {
    case 'rgb':
      initial = tinycolor(initial).toHexString()
      break
    case 'hex':
      initial = tinycolor(initial).toHexString()
      break
    case 'array':
      initial = tinycolor.fromRatio({r: initial[0], g: initial[1], b: initial[2]}).toHexString()
      break
    default:
      break
  }

  var picker = new ColorPicker({
    el: icon,
    color: initial,
    background: theme.background1,
    width: 125,
    height: 100
  })

  css(picker.$el, {
    marginTop: '2em',
    display: 'none',
    position: 'absolute'
  })

  css(icon, {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'top',
    width: '13%',
    height: '2em',
    backgroundColor: picker.getHexString()
  })

  icon.onmouseout = function (e) {
    picker.$el.style.display = 'none'
  }

  setTimeout(function () {
    self.emit('initialized', initial)
  })

  picker.onChange(function (hex) {
    value.value = format(hex)
    css(icon, {backgroundColor: hex})
    self.emit('input', format(hex))
  })

  function format (hex) {
    switch (opts.format) {
      case 'rgb':
        return tinycolor(hex).toRgbString()
      case 'hex':
        return tinycolor(hex).toHexString()
      case 'array':
        var rgb = tinycolor(hex).toRgb()
        return [rgb.r / 255, rgb.g / 255, rgb.b / 255].map(function (x) {
          return x.toFixed(2)
        })
      default:
        return hex
    }
  }
}
