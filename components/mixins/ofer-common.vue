<script>
import moment from 'moment'
import striptags from '~plugins/striptags'
moment.locale('es')

export default {
  computed: {
    name () {
      return this.id.split('-').join(' ').toUpperCase()
    },
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
    getTextFromHtml (strHtml) {
      return striptags(strHtml)
    },
    exists (data) {
      if (!data) {
        return false
      }
      return (Object.keys(data).length > 0)
    },
    /**
     * @param  {Object} { arrObj, fieldName }
     * @return {[type]}
     */
    arrayToString (paramArray) {
      if (!paramArray) return ''
      if (Array.isArray(paramArray)) {
        return paramArray.reduce(function (prev, curr) {
          return prev.split('-').join(' ') + curr.split('-').join(' ')
        }, '')
      }
    }
  }
}
</script>
