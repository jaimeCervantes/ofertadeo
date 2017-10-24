<script>
import OferCommon from '~/components/mixins/ofer-common.vue'

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
    mergeSeoWith (seo, defaults) {
      for (let prop in defaults) {
        // If the property exists in the item, then replace the seo values
        // by the ones in the item
        if (defaults.hasOwnProperty(prop) && defaults[prop]) {
          seo[prop] = defaults[prop]
        }
      }
      return seo
    }
  }
}
</script>
