var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var css = require('dom-css')
var uuid = require('node-uuid')
var insertcss = require('insert-css')

module.exports = Multibox
inherits(Multibox, EventEmitter)

function Multibox (root, opts, theme, id) {
  if (!(this instanceof Multibox)) return new Multibox(root, opts, theme, id)
  opts = opts || {}
  var self = this

  var container = require('./container')(root, opts.label)
  require('./label')(container, opts.label, theme)

  var boxes = container.appendChild(document.createElement('div'))
  css(boxes, {
    position: 'relative',
    width: '60%',
    display: 'inline-block',
    paddingBottom: '7px'
  })

  if (!opts.count) opts.count = opts.names.length
  var inputs = []

  var i =0 
  for (i;i<opts.count;i++) {
    var box = boxes.appendChild(document.createElement('span'))
    css(box, {
      display: 'inline-block'
    })

    var classname = 'control-panel-multibox-' + id + uuid.v4() + i

    var input = box.appendChild(document.createElement('input'))
    input.id = 'multibox-' + opts.label + id + i
    input.type = 'checkbox'
    input.checked = opts.initial ? opts.initial[i] : true
    input.classList.add('control-panel-multibox-' + id)
    input.classList.add(classname)

    var label = box.appendChild(document.createElement('label'))
    label.htmlFor = 'multibox-' + opts.label + id + i
    label.className = 'control-panel-multibox-' + id

    var color = opts.colors ? opts.colors[i] : theme.foreground1
    var tmpcss = `input[type=checkbox]:checked.${classname}  + label:before {
      background-color: ${color};
    }`
    insertcss(tmpcss)

    if (opts.names) {
      var name = box.appendChild(document.createElement('span'))
      name.innerHTML = opts.names[i]
      css(name, {
        backgroundColor: theme.background2,
        paddingRight: '7px',
        verticalAlign: 'middle',
        padding: '2px',
        marginRight: '8px',
        color: theme.text2
      })
    }

    inputs.push(input)
  }

  setTimeout(function () {
    var state = inputs.map(function (d) {
      return d.checked
    })
    self.emit('initialized', state)
  })

  inputs.forEach(function (input) {
    input.onchange = function (data) {
      var state = inputs.map(function (d) {
        return d.checked
      })
      self.emit('input', state)
    }
  })
}
