<template></template>
<script>
import OferConfig from '~components/mixins/ofer-config.js'
	/* eslint-disable */
import router from '~router'

export default {
	methods: {
		googleAnalytics () {
			/*
			** Only run on client-side and only in production mode
			*/
			if (OferConfig.app_status === 'deploy') {
			  /*
			  ** Include Google Analytics Script
			  */
			  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
			  /*
			  ** Set the current page
			  */
			  ga('create', 'UA-100911510-1', 'auto')
			  /*
			  ** Every time the route changes (fired on initialization too)
			  */
			  router.afterEach((to, from) => {
			    /*
			    ** We tell Google Analytic to add a page view
			    */
			    ga('set', 'page', to.fullPath)
			    ga('send', 'pageview')
			  })
			}
		},
		pushcrew () {
			// Disabling pushcrew because there are not interactions,
			// Maybe when the system get users and comment this works
			if (false) {
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
		}
	},
	created () {
		if (process.BROWSER_BUILD) {
			// @TODO: By the momento GA is not working good inside a component	
			// this.googleAnalytics()
			this.pushcrew()	
		}
	}
}
</script>
