var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var fs = require('fs')
var css = require('dom-css')
var insertcss = require('insert-css')
var path = require('path')
var isstring = require('is-string')
var themes = require('./themes')
var uuid = require('get-uid')

module.exports = Plate
inherits(Plate, EventEmitter)

function Plate (items, opts) {
  if (!(this instanceof Plate)) return new Plate(items, opts)
  var self = this
  opts = opts || {}
  opts.width = opts.width || 300
  opts.theme = opts.theme || 'dark'
  opts.theme = isstring(opts.theme) ? themes[opts.theme] : opts.theme
  opts.root = opts.root || document.body
  opts.position = opts.position

  var box = this.box = document.createElement('form')
  var id = uuid()
  box.className = 'control-panel'
  box.id = 'control-panel-' + id

  var basecss = fs.readFileSync(path.join(__dirname, 'components', 'styles', 'base.css'))
  var colorcss = fs.readFileSync(path.join(__dirname, 'components', 'styles', 'color.css'))
  var rangecss = fs.readFileSync(path.join(__dirname, 'components', 'styles', 'range.css'))
  var checkboxcss = fs.readFileSync(path.join(__dirname, 'components', 'styles', 'checkbox.css'))
  var buttoncss = fs.readFileSync(path.join(__dirname, 'components', 'styles', 'button.css'))
  var intervalcss = fs.readFileSync(path.join(__dirname, 'components', 'styles', 'interval.css'))
  var selectcss = fs.readFileSync(path.join(__dirname, 'components', 'styles', 'select.css'))
  var valuecss = fs.readFileSync(path.join(__dirname, 'components', 'styles', 'value.css'))

  basecss = String(basecss)
    .replace(new RegExp('{{ FONT_FAMILY }}', 'g'), opts.theme.fontFamily)
    .replace(new RegExp('{{ FONT_SIZE }}', 'g'), opts.theme.fontSize)
    .replace(new RegExp('{{ HELP_COLOR }}', 'g'), opts.theme.foreground1)
  rangecss = String(rangecss)
    .replace(new RegExp('{{ THUMB_COLOR }}', 'g'), opts.theme.foreground1)
    .replace(new RegExp('{{ TRACK_COLOR }}', 'g'), opts.theme.background2)
    .replace(new RegExp('{{ UUID }}', 'g'), id)
  checkboxcss = String(checkboxcss)
    .replace(new RegExp('{{ BOX_COLOR }}', 'g'), opts.theme.background2)
    .replace(new RegExp('{{ ICON_COLOR }}', 'g'), opts.theme.foreground1)
    .replace(new RegExp('{{ UUID }}', 'g'), id)
  buttoncss = String(buttoncss)
    .replace(new RegExp('{{ BUTTON_COLOR }}', 'g'), opts.theme.text2)
    .replace(new RegExp('{{ BUTTON_BG }}', 'g'), opts.theme.background2)
    .replace(new RegExp('{{ BUTTON_COLOR_HOVER }}', 'g'), opts.theme.text2)
    .replace(new RegExp('{{ BUTTON_BG_HOVER }}', 'g'), opts.theme.background2hover)
    .replace(new RegExp('{{ BUTTON_COLOR_ACTIVE }}', 'g'), opts.theme.background2)
    .replace(new RegExp('{{ BUTTON_BG_ACTIVE }}', 'g'), opts.theme.text2)
    .replace(new RegExp('{{ UUID }}', 'g'), id)
  intervalcss = String(intervalcss)
    .replace(new RegExp('{{ INTERVAL_COLOR }}', 'g'), opts.theme.foreground1)
    .replace(new RegExp('{{ TRACK_COLOR }}', 'g'), opts.theme.background2)
    .replace(new RegExp('{{ UUID }}', 'g'), id)
  selectcss = String(selectcss)
    .replace(new RegExp('{{ TEXT_COLOR }}', 'g'), opts.theme.text2)
    .replace(new RegExp('{{ BG_COLOR }}', 'g'), opts.theme.background2)
    .replace(new RegExp('{{ BG_COLOR_HOVER }}', 'g'), opts.theme.background2hover)
    .replace(new RegExp('{{ UUID }}', 'g'), id)
  valuecss = String(valuecss)
    .replace(new RegExp('{{ TEXT_COLOR }}', 'g'), opts.theme.text2)
    .replace(new RegExp('{{ BG_COLOR }}', 'g'), opts.theme.background2)
    .replace(new RegExp('{{ UUID }}', 'g'), id)
  insertcss(basecss)
  insertcss(rangecss)
  insertcss(colorcss)
  insertcss(checkboxcss)
  insertcss(buttoncss)
  insertcss(intervalcss)
  insertcss(selectcss)
  insertcss(valuecss)

  css(box, {
    background: opts.theme.background1,
    width: opts.width,
    padding: '14px',
    paddingBottom: '8px',
    opacity: 0.95
  })

  if (opts.position) {
    if (opts.position === 'top-right' ||
      opts.position === 'top-left' ||
      opts.position === 'bottom-right' ||
      opts.position === 'bottom-left') css(box, {position: 'absolute'})

    if (opts.position === 'top-right' || opts.position === 'bottom-right') css(box, {right: 8})
    else css(box, {left: 8})

    if (opts.position === 'top-right' || opts.position === 'top-left') css(box, {top: 8})
    else css(box, {bottom: 8})
  }

  if (opts.title) require('./components/title')(box, opts.title, opts.theme)

  var components = {
    button: require('./components/button'),
    text: require('./components/text'),
    range: require('./components/range'),
    checkbox: require('./components/checkbox'),
    color: require('./components/color'),
    interval: require('./components/interval'),
    select: require('./components/select')
  }

  var element
  var state = this.state = {}

  items.forEach(function (item) {
    if (item.type !== 'button') {
      state[item.label] = item.initial
    }
  })

  items.forEach(function (item) {
    element = (components[item.type] || components.text)(box, item, opts.theme, id)

    element.on('initialized', function (data) {
      state[item.label] = data
    })

    element.on('input', function (data) {
      state[item.label] = data
      item.input && item.input(data, state)
      self.emit('input', state)
    })
  })

  opts.root.appendChild(box)
}
