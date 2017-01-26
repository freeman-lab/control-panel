var css = require('dom-css')

module.exports = function (root, text, theme) {
  var title = root.appendChild(document.createElement('div'))
  title.innerHTML = text

  css(title, {
    width: '100%',
    textAlign: 'center',
    color: theme.text2,
    textTransform: 'uppercase',
    lineHeight: '1.2',
    marginTop: '0',
    marginBottom: '1em'
  })

  return title
}
