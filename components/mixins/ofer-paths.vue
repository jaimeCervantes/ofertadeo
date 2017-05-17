<script>
export default {
  computed: {
    breadcrumbs () {
      return this.path.split('/')
      .filter(elem => { return elem })
      .map((elem, index, array) => {
        var previousPaths = array.slice(0, index - 1)
        var href = `/${elem}`
        if (previousPaths.length > 0) {
          href = previousPaths.reduce((prev, current) => {
            return `${prev}/${current}`
          })
        }

        return {
          text: elem,
          href: href,
          disabled: false,
          target: '_self'
        }
      })
    }
  }
}
</script>
