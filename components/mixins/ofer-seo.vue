<script>
import OferCommon from '~components/mixins/ofer-common.vue'

export default {
  components: {
    OferCommon
  },
  methods: {
    getSeoData (seoData, data) {
      let res = {}
      for (let d in seoData) {
        if (seoData.hasOwnProperty(d)) {
          res[d] = seoData[d]
          Object.keys(data).concat(['year']).forEach(function (curr) {
            let value = data[curr]
            if (curr === 'year') {
              value = this.dates().format('YYYY')
            }
            res[d] = res[d].replace(new RegExp('{' + curr + '}', 'g'), value)
          }.bind(this))
        }
      }
      return res
    },
    getDefaultsForSeo (seo, defaults) {
      if (!this.exists(seo)) {
        seo = {}
        seo.meta_title = defaults.meta_title
        seo.meta_description = defaults.meta_description
        seo.title = defaults.title
        seo.h1 = defaults.h1 || defaults.title
      }

      return seo
    }
  }
}
</script>
