var css = require('dom-css')

module.exports = function (root, text, theme, width, left) {
  var background = root.appendChild(document.createElement('div'))
  var value = background.appendChild(document.createElement('span'))

  value.innerHTML = text

  var bgcss = {
    position: 'absolute',
    backgroundColor: theme.background2,
    paddingLeft: '1.5%',
    height: '20px',
    width: width,
    display: 'inline-block',
    overflow: 'hidden'
  }

  if (!left) {
    bgcss.right = 0
  }

  css(background, bgcss)

  css(value, {
    color: theme.text2,
    display: 'inline-block',
    verticalAlign: 'sub',
    userSelect: 'text',
    cursor: 'text'
  })

  return value
}
