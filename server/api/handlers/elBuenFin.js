module.exports = function (spec) {
  let that = {}
  spec = spec || {}
  let elBuenFinCategory = 'el-buen-fin'

  function getById (params) {
    let crudInst = spec.crud
    let conf = spec.config

    spec.router.get('/el-buen-fin/stores/:_id', function (req, res) {
      var page = req.query.page ? Number(req.query.page) : 0
      var iterable = [
        crudInst.getItems({
          collection: conf.db.collections.main,
          query: { 'stores._id': req.params._id, 'categories._id': elBuenFinCategory },
          items_per_page: conf.db.itemsPerPage,
          skip: conf.db.itemsPerPage * page,
          sort: { published: -1 },
          projection: {
            name: 1,
            thumbnail: 1,
            elBuenFin: 1,
            slug: 1,
            meta_description: 1,
            img: 1,
            img_data: 1,
            img_alt: 1,
            img_title: 1,
            categories: 1,
            published: 1,
            modified: 1
          }
        }),
        crudInst.getItem({
          collection: conf.db.collections.elBuenFin,
          query: { _id: req.params._id },
          projection: {
            name: 1,
            thumbnail: 1,
            slug: 1,
            content: 1,
            title: 1,
            h1: 1,
            h2: 1,
            meta_title: 1,
            meta_description: 1,
            url_site: 1,
            img: 1,
            img_alt: 1,
            img_title: 1,
            img_data: 1
          }
        }),
        crudInst.getPagination({
          query: { 'stores._id': req.params._id, 'categories._id': elBuenFinCategory },
          collection: conf.db.collections.main
        }),
        crudInst.getItem({
          collection: conf.db.collections.seo,
          query: { _id: elBuenFinCategory }
        })
      ]

      Promise.all(iterable)
        .then(function (results) {
          res.json({
            items: results[0],
            info: results[1],
            pagination: results[2],
            seo: results[3]
          })
        })
        .catch(function (error) {
          res.json(error)
        })
    })

    return that
  }

  function getIndex () {
    let crudInst = spec.crud
    let conf = spec.config
    spec.router.get('/el-buen-fin', function (req, res) {
      let page = req.query.page ? Number(req.query.page) : 0
      let iterable = [
        crudInst.aggregate({
          collection: conf.db.collections.elBuenFin,
          pipeline: [
            { $sample: { size: 15 } },
            { $project: {
              _id: 1,
              name: 1,
              slug: 1,
              thumbnail: 1,
              img: 1,
              img_data: 1,
              img_alt: 1,
              img_title: 1,
              published: 1,
              modified: 1
            }
            }
          ]
        }),
        crudInst.getItems({
          collection: conf.db.collections.main,
          query: { 'categories._id': elBuenFinCategory },
          items_per_page: conf.db.itemsPerPage,
          skip: conf.db.itemsPerPage * page,
          sort: { published: -1 },
          projection: {
            name: 1,
            thumbnail: 1,
            elBuenFin: 1,
            slug: 1,
            meta_description: 1,
            img: 1,
            img_data: 1,
            img_alt: 1,
            img_title: 1,
            categories: 1,
            stores: 1,
            published: 1,
            modified: 1
          }
        }),
        crudInst.getPagination({
          query: { 'categories._id': elBuenFinCategory },
          collection: conf.db.collections.main
        })
      ]

      Promise.all(iterable)
        .then(function (results) {
          res.json({
            stores: results[0],
            items: results[1],
            pagination: results[2]
          })
        })
        .catch(function (error) {
          console.log(error)
          res.json(error)
        })
    })

    return that
  }

  function getItems () {
    let crudInst = spec.crud
    let conf = spec.config
    spec.router.get('/el-buen-fin/items', function (req, res) {
      let page = req.query.page ? Number(req.query.page) : 0
      let iterable = [
        crudInst.getItems({
          collection: conf.db.collections.main,
          query: { 'categories._id': elBuenFinCategory },
          items_per_page: conf.db.itemsPerPage,
          skip: conf.db.itemsPerPage * page,
          sort: { published: -1 },
          projection: {
            name: 1,
            thumbnail: 1,
            elBuenFin: 1,
            slug: 1,
            meta_description: 1,
            img: 1,
            img_data: 1,
            img_alt: 1,
            img_title: 1,
            categories: 1,
            stores: 1,
            published: 1,
            modified: 1
          }
        }),
        crudInst.getPagination({
          query: { 'categories._id': elBuenFinCategory },
          collection: conf.db.collections.main
        })
      ]

      Promise.all(iterable)
        .then(function (results) {
          res.json({
            items: results[0],
            pagination: results[1]
          })
        })
        .catch(function (error) {
          console.log(error)
          res.json(error)
        })
    })

    return that
  }

  function getStores () {
    let crudInst = spec.crud
    let conf = spec.config

    spec.router.get('/el-buen-fin/stores', function (req, res) {
      let iterable = [
        crudInst.aggregate(
          {
            collection: conf.db.collections.elBuenFin,
            pipeline: [
              { $limit: 100 }, // Primiero limitar la cantidad
              // Ordenarlo por nombre para obtener el arreglo en el sig, pipe ordenado alfabeticamente en orden ascendente
              { $sort: { name: 1 } },
              { $project: {
                // A mayusculas, porque 'e' !== 'E'
                _id: 1,
                name: 1,
                slug: 1,
                thumbnail: 1,
                img: 1,
                img_data: 1,
                img_alt: 1,
                img_title: 1,
                published: 1,
                modified: 1
              }
              },
              {
                $group: {
                  _id: {
                    $switch: spec.commonDbParams.groupAlphabeticallyInSwitch
                  },
                  stores: { $push: '$$CURRENT' }
                }
              },
              { $sort: { _id: 1 } }
            ], // pipeline
            options: {
              collation: {
                locale: conf.db.collation.locale,
                alternate: 'shifted'
              }
            } // options
          }
        ) // aggregate
      ] // iterable

      Promise.all(iterable)
        .then(function (results) {
          res.json({
            items: results[0]
          })
        })
        .catch(function (error) {
          console.log(new Error(error))
          res.json(error)
        })
    })

    return that
  }

  function getFormData () {
    let conf = spec.config
    let crudInst = spec.crud
    let router = spec.router
    // get an specific promotion data, query by slug property
    router.get('/formdata/el-buen-fin/:id', function (req, res) {
      let iterable = [
        crudInst.getItem({
          collection: conf.db.collections.elBuenFin,
          query: { _id: req.params.id },
          items_per_page: 1
        })
      ]

      Promise.all(iterable)
        .then(function (results) {
          console.log(results)
          res.json({
            item: results[0]
          })
        })
        .catch(function (error) {
          res.json(error)
        })
    }) // router.get

    return that
  }

  /**
   * Creates or update a store
   * @param  {[type]} params Until now it contains the path of the request
   * @return {Object}        For cascade purpose
   */
  function save (params) {
    let conf = spec.config
    let crudInst = spec.crud
    let saveMethod = 'setItem'

    spec.router.post(params.path, function (req, res) {
      let rightNow = new Date()
      let saveParams = {
        collection: conf.db.collections.elBuenFin
      }
      let data = Object.assign(req.body, { modified: rightNow })

      // Al crear nueva, la fecha de publicacion y modificacion son la misma
      if (!data.hasOwnProperty('published')) {
        data.published = rightNow
      } else {
        // asegurandonos que se guarde como un campo tipo fecha
        data.published = new Date(data.published)
      }

      if (data.hasOwnProperty('_id')) {
        saveMethod = 'update'
        delete data._id
        delete saveParams.document
        saveParams.query = { _id: req.params.id }
        saveParams.update = { $set: data }
        saveParams.options = { upsert: true }
      } else {
        data._id = data.slug
        saveParams.document = data
      }

      crudInst[saveMethod](saveParams)
        .then(function (dbResponse) {
        //  return response to client with res object
          res.json(dbResponse)
          return dbResponse
        })
        .catch(function (err) {
          console.log('Ocurrió un error al tratar de Guardar una Tienda:')
          console.log(err)
          res.json(err)
        })
        .then(function (dbResponse) {
          if (dbResponse.result && dbResponse.result.ok) {
            return true
          } else {
            return Error(dbResponse)
          }
        })
        .then(function (result) {
          if (result === true) {
            Promise.all([spec.csm.elBuenFin(), spec.csm.pages()])
              .then(function (results) {
                if (results && results.length > 0) {
                  return spec.csm.index()
                }
              })
              .catch(function (err) {
                console.log(err)
                return err
              })
          } else {
            console.log(result)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    }) // router.post

    return that
  }

  function existsBySlug () {
    let crud = spec.crud
    let config = spec.config
    spec.router.get('/el-buen-fin/exists/:slug', function (req, res) {
      crud.getItem({
        collection: config.db.collections.elBuenFin,
        query: { slug: req.params.slug },
        items_per_page: 1,
        projection: { _id: 1}
      })
        .then(function (offer) {
          console.log(offer)
          if (offer && offer._id) {
            res.json({
              success: true
            })

            return
          }

          res.json({
            success: false
          })
        })
        .catch(function (error) {
          console.log(error)
          res.json(error)
        })
    })

    return that
  }

  that.save = save
  that.getById = getById
  that.getIndex = getIndex
  that.getItems = getItems
  that.getStores = getStores
  that.getFormData = getFormData
  that.existsBySlug = existsBySlug

  return that
}
