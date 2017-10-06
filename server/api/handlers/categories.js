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
            img: 1,
            img_alt: 1,
            img_title: 1,
            img_data: 1
          }
        }),
        crudInst.getPagination({
          query: { 'categories._id': req.params._id },
          collection: conf.db.collections.main
        })
      ]

      Promise.all(iterable)
      .then(function (results) {
        res.json({
          items: results[0],
          info: results[1],
          pagination: results[2]
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
            var iterable = [
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
              { $group: { 
                  _id: { $substrCP: ["$_id", 0, 1] },
                  categories: { $push: "$$CURRENT"  } 
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

  that.getIndex = getIndex
  that.getById = getById

  return that
}
