import config from '../config.js'

let script = '9bb3dc20d980ec138bfbca444454fb5d.js'
if (config.app_status === 'deploy') {
  script = 'a93d53fc0723ce637666966cd5601748.js'
}

(function (p, u, s, h) {
  p._pcq = p._pcq || []
  p._pcq.push(['_currentTime', Date.now()])
  s = u.createElement('script')
  s.type = 'text/javascript'
  s.async = true
  s.src = 'https://cdn.pushcrew.com/js/' + script
  h = u.getElementsByTagName('script')[0]
  h.parentNode.insertBefore(s, h)
})(window, document)
