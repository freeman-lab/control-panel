var control = require('./')

var panel = control([
  {type: 'range', label: 'range slider', min: 0, max: 100, initial: 20},
  {type: 'range', label: 'range stepped', min: 0, max: 1, step: 0.2},
  {type: 'text', label: 'text', initial: 'my setting'},
  {type: 'checkbox', label: 'checkbox', initial: true},
  {type: 'color', label: 'color rgb', format: 'rgb', initial: 'rgb(100,200,100)'},
  {type: 'color', label: 'color hex', format: 'hex', initial: '#30b2ba'},
  {type: 'range', label: 'one more', min: 0, max: 10},
  {type: 'select', label: 'key/value select', options: {state1: 'State One', state2: 'State Two'}, initial: 'state1'},
  {type: 'select', label: 'array select', options: ['State One', 'State Two'], initial: 'State One'}
],
  {theme: 'light', title: 'example panel', position: 'top-left'}
)

panel.on('input', function (data) {
  console.log(data)
})
