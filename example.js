var input = require('./')

var panel = input([
  {type: 'range', label: 'range slider', min: 0, max: 100, initial: 20},
  {type: 'range', label: 'range slider step', min: 0, max: 1, step: 0.2},
  {type: 'text', label: 'text', initial: 'my setting'},
  {type: 'checkbox', label: 'checkbox', initial: true},
  {type: 'color', label: 'color rgb', format: 'rgb', initial: 'rgb(100,200,100)'},
  {type: 'color', label: 'color hex', format: 'hex', initial: '#30b2ba'},
  {type: 'range', label: 'one more', min: 0, max: 10}
], 
  {theme: 'dark', title: 'example panel'}
)

panel.on('input', function (data) {
  console.log(data)
})