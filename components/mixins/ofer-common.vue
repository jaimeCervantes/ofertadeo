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
      return this.getDate('MMMM YYYY')
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
      return moment().format(format || 'DD MMMM YYYY').toUpperCase()
    },
    getTextFromHtml (strHtml) {
      return striptags(strHtml)
    },
    exists (data) {
      if (!data) {
        return false
      }
      return (Object.keys(data).length > 0)
    }
  }
}
</script>
