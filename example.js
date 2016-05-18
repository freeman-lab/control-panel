var control = require('./')

var panel = control([
  {type: 'range', label: 'range slider', min: 0, max: 100, initial: 20},
  {type: 'range', label: 'range stepped', min: 0, max: 1, step: 0.2},
  {type: 'text', label: 'text', initial: 'my setting'},
  {type: 'checkbox', label: 'checkbox', initial: true},
  {type: 'color', label: 'color rgb', format: 'rgb', initial: 'rgb(100,200,100)'},
  {type: 'color', label: 'color hex', format: 'hex', initial: '#30b2ba'},
  {type: 'interval', label: 'an interval', min: 0, max: 10, initial: [3, 4], steps: 20},
  {type: 'interval', label: 'log interval', min: 0.1, max: 10, initial: [0.1, 1], scale: 'log', steps: 20},
  {type: 'interval', label: 'neg log interval', min: -0.1, max: -10, initial: [-0.1, -1], scale: 'log', steps: 20},
  {type: 'range', label: 'one more', min: 0, max: 10}
],
  {theme: 'light', title: 'example panel', position: 'top-left', width: 400}
)

panel.on('input', function (data) {
  console.log(data)
})
