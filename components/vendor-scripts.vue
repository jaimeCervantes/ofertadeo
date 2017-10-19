<template></template>
<script>
import OferConfig from '~/components/mixins/ofer-config.js'

export default {
  methods: {
    pushcrew () {
      let script = '9bb3dc20d980ec138bfbca444454fb5d.js'
      if (OferConfig.app_status === 'deploy') {
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
    }
  },
  created () {
    if (process.browser) {
      // Disabling pushcrew because there are not interactions,
      // Maybe when the system get users and comment this works
      //this.pushcrew()
    }
  }
}
</script>
