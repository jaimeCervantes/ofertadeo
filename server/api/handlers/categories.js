module.exports = function (spec) {
  let that = {}
  spec = spec || {}

  function getById () {
    let conf = spec.config
    let crudInst = spec.crud

    spec.router.get('/categories/:_id', function (req, res) {
      let page = req.query.page ? Number(req.query.page) : 0

      let iterable = [
        crudInst.getItems({
          collection: conf.db.collections.main,
          query: { 'categories._id': req.params._id },
          items_per_page: conf.db.itemsPerPage,
          skip: conf.db.itemsPerPage * page,
          sort: { published: -1 },
          projection: {
            name: 1,
            thumbnail: 1,
            stores: 1,
            slug: 1,
            img: 1,
            img_data: 1,
            img_alt: 1,
            img_title: 1,
            published: 1,
            modified: 1
          }
        }),
        crudInst.getItem({
          collection: conf.db.collections.categories,
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
            img: 1,
            img_alt: 1,
            img_title: 1,
            img_data: 1
          }
        }),
        crudInst.getPagination({
          query: { 'categories._id': req.params._id },
          collection: conf.db.collections.main
        }),
        crudInst.getItem({
          collection: conf.db.collections.seo,
          query: { _id: 'categories' }
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

  function getIndex (params) {
    let conf = spec.config
    let crudInst = spec.crud

    spec.router.get('/categories', function (req, res) {

      let page = req.query.page ? Number(req.query.page) : 0
      let iterable = [
        crudInst.aggregate(
          {
            collection: conf.db.collections.categories,
            pipeline: [
              { $limit: 100 }, // Primiero limitar la cantidad
              // Ordenarlo por nombre para obtener el arreglo stores en el sig, pipe ordenado alfabeticamente en orden ascendente
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
                  categories: { $push: "$$CURRENT" } 
                }
              },
              { $sort: { _id: 1 } }
            ], // pipeline
            options: {
              collation: {
               locale: conf.db.collation.locale,
               alternate: "shifted"
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
        console.log(error)
        res.json(error)
      });

    }) // router.get of express

    return that
  }

  function getFormData () {
    let conf = spec.config
    let crudInst = spec.crud
    let router = spec.router
    // get an specific promotion data, query by slug property
    router.get('/formdata/categories/:id', function (req, res) {
      let iterable = [
        crudInst.getItem({
          collection: conf.db.collections.categories,
          query: { _id: req.params.id },
          items_per_page: 1
        })
      ]

      Promise.all(iterable)
        .then(function (results) {
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

    spec.router.post(params.path, function (req, res) {
      let rightNow = new Date()
      let saveMethod = 'setItem'
      let saveParams = {
        collection: conf.db.collections.categories
      }
      let data = Object.assign({ modified: rightNow }, req.body)

      // Al crear nueva, la fecha de publicacion y modificacion son la misma
      if (!data.hasOwnProperty('published')) {
        data.published = rightNow
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
        console.log('Ocurrió un error al tratar de Guardar una Categoría:')
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
          Promise.all([spec.csm.categories(), spec.csm.pages()])
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

  that.getIndex = getIndex
  that.getById = getById
  that.getFormData = getFormData
  that.save = save

  return that
}
