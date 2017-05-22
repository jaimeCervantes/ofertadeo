<script>
export default {
  computed: {
    breadcrumbs () {
      var paths = this.path.split('/')
                    .filter(elem => { return elem })
                    .map((elem, index, array) => {
                      var previousPaths = array.slice(0, index)
                      var href = `/${elem}`
                      var text = elem.split('-').join(' ')
                      if (previousPaths.length > 0) {
                        href = previousPaths.reduce((accum, current) => {
                          return accum + current + '/'
                        }, '/')
                        href += `${elem}`
                      }

                      if (index < (array.length - 1)) {
                        text += ' /'
                      }

                      return {
                        text: text,
                        href: href,
                        disabled: false,
                        target: '_self'
                      }
                    })

      paths.unshift({
        text: 'Inicio /',
        href: '/',
        disabled: false,
        target: '_self'
      })

      return paths
    }
  }
}
</script>
