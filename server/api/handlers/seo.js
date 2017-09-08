module.exports = function (spec) {
  let that = {}
  spec = spec || {}

  function get () {
    spec.router.get('/seo/:id', function (req, res) {
      spec.crud.getItem({
        collection: spec.config.db.collections.seo,
        query: { _id: req.params.id }
      })
      .then(function (dbRes) {
        res.json(dbRes)
        return dbRes
      })
      .catch(function (err) {
        console.log('Ocurrió un error al tratar de conseguir la configuracion seo de tiendas:')
        console.log(err)
        res.json(err)
      })
    })

    return that
  }

  function save () {
    spec.router.post('/seo/:id', function (req, res) {
      let rightNow = new Date()
      let missingData = { modified: rightNow }

      if (!req.body.hasOwnProperty('date')) {
        missingData.date = rightNow
      }

      spec.crud.update({
        collection: spec.config.db.collections.seo,
        query: { _id: req.params.id },
        update: { $set: Object.assign(missingData, req.body) },
        options: { upsert: true }
      })
      .then(function (dbRes) {
        res.json(dbRes)
        return dbRes
      })
      .catch(function (err) {
        console.log('Ocurrió un error al tratar de Guardar la configuracion seo de tiendas:')
        console.log(err)
        res.json(err)
      })
    })

    return that
  }

  that.get = get
  that.save = save

  return that
}
