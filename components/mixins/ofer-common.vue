<script>
import moment from 'moment'
import striptags from '~plugins/striptags'
import OferConfig from '~components/mixins/ofer-config.js'
moment.locale('es')

export default {
  props: {
    config: {
      type: Object,
      default: function () {
        return OferConfig
      }
    }
  },
  computed: {
    date () {
      var date = this.getDate('MMMM YYYY')
      return date.charAt(0).toUpperCase() + date.slice(1)
    },
    year () {
      return moment().format('YYYY').toUpperCase()
    }
  },
  methods: {
    concatItems (items) {
      this.items = this.items.concat(items)
    },
    getDate (format) {
      return moment().format(format || 'DD MMMM YYYY')
    },
    getISODateStr (paramDate) {
      let date
      if (paramDate) {
        date = new Date(paramDate)
      } else {
        date = new Date()
      }
      let substract = date.getTime() - (300 * 60 * 1000) // minus 5 hrs
      let dateStr = new Date(substract).toISOString().split('.')[0]
      return dateStr + '-05:00'
    },
    sliceTextFromHtml (strHtml, limit) {
      let text = striptags(strHtml)
      if (text.length <= limit || !limit) {
        return text
      } else {
        return text.slice(0, limit - 3) + '...'
      }
    },
    exists (data) {
      if (!data) {
        return false
      }
      return (Object.keys(data).length > 0)
    },
    getSEOData (seoData, data) {
      let res = {}
      for (let d in seoData) {
        if (seoData.hasOwnProperty(d)) {
          res[d] = seoData[d]
          Object.keys(data).forEach(function (curr) {
            res[d] = res[d].replace('{' + curr + '}', data[curr])
          })
        }
      }
      return res
    }
  }
}
</script>
