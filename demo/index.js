var control = require('../')
var css = require('dom-css')

document.body.style.background = 'rgb(150,150,150)'
var div1 = document.body.appendChild(document.createElement('div'))
css(div1, {marginRight: '11px', display: 'inline-block'})
var div2 = document.body.appendChild(document.createElement('div'))
css(div2, {display: 'inline-block'})

var inputs = [
  {type: 'range', label: 'range slider', min: 0, max: 100, initial: 20},
  {type: 'range', label: 'stepped slider', min: 0, max: 1, step: 0.2, initial: 0.6},
  {type: 'interval', label: 'interval', min: 0, max: 100, initial: [25, 50]},
  {type: 'text', label: 'text', initial: 'my setting'},
  {type: 'checkbox', label: 'checkbox', initial: true},
  {type: 'color', label: 'color rgb', format: 'rgb', initial: 'rgb(100,200,100)'},
  {type: 'color', label: 'color hex', format: 'hex', initial: '#30b2ba'},
  {type: 'button', label: 'gimme an alert', action: function () { window.alert('hello!') }},
  {type: 'select', label: 'selection', options: ['option 1', 'option 2']},
  {type: 'multibox', label: 'multiple checkboxes', names: ['box1', 'box2'], colors: ['rgb(100,120,230)', 'rgb(210,100,190)'], initial: [true, true]}
]

control(inputs,
  {theme: 'light', title: 'example panel 1', root: div1}
)

control(inputs,
  {theme: 'dark', title: 'example panel 2', root: div2}
)
