/**
 * Promotions routes and functionality for promotions requests
 * @param  {Object} spec Dependencies and more parameters for the correct behaviour
 * @return {Object}
 */
module.exports = function (spec) {
  let that = {}
  spec = spec || {}

  /**
   * Manage the Offer request, query by slug property
   * @return {Object} For cascade purposes
   */
  function getBySlug () {
    let crud = spec.crud
    let config = spec.config
    spec.router.get('/promotions/:slug', function (req, res) {
      let iterable = [
        crud.getItem({
          collection: config.db.collections.main,
          query: { slug: req.params.slug },
          items_per_page: 1
        }),
        crud.aggregate({
          collection: config.db.collections.secundary,
          pipeline: [
            { $sample: { size: 15 } },
            { $project: { name: 1 } }
          ]
        })
      ]

      let data = {};
      return Promise.all(iterable)
        .then(function (results) {
          if(results && results.length > 0) {
            data.item = results[0]
            data.stores = results[1]
            return crud.getItems({
              collection: config.db.collections.main,
              query: { categories: { $in: data.item.categories }, _id: { $ne: data.item._id } },
              projection: {
                name: 1,
                thumbnail: 1,
                stores: 1,
                slug: 1,
                meta_description: 1,
                img: 1,
                img_data: 1,
                img_alt: 1,
                img_title: 1,
                categories: 1,
                published: 1,
                modified: 1
              },
              sort: { modified: -1 },
              items_per_page: 4
            })
          } else {
            return Promise.reject(new Error(results));
          }
        })
        .then(function (relatedItems) {
          data.relatedItems = relatedItems
          res.json(data)
        })
        .catch(function (error) {
          console.log(error)
          res.json(error)
        })
    })

    return that
  }

  function existsBySlug () {
    let crud = spec.crud
    let config = spec.config
    spec.router.get('/promotions/exists/:slug', function (req, res) {
      crud.getItem({
        collection: config.db.collections.main,
        query: { slug: req.params.slug },
        items_per_page: 1,
        projection: { _id: 1}
      })
      .then(function (offer) {
        console.log(offer)
        if(offer && offer._id) {
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

    return that;
  }

  /**
   * Manage the request for creating and editing Offers(promotions)
   * @return {Object} For cascade purposes
   */
  function getFormData () {
    let conf = spec.config
    let crudInst = spec.crud
    let router = spec.router

    // formdata for create and edit promotions
    router.get('/formdata/promotions', function (req, res) {
      let iterable = [
        crudInst.getItems({
          collection: conf.db.collections.secundary,
          items_per_page: 100,
          projection: { name: 1 },
          sort: { name: 1 }
        }),
        crudInst.getItems({
          collection: conf.db.collections.categories,
          items_per_page: 100,
          projection: { name: 1 },
          sort: { name: 1 }
        })
      ]

      Promise.all(iterable)
        .then(function (results) {
          res.json({
            stores: results[0],
            categories: results[1]
          })
        })
        .catch(function (error) {
          res.json(error)
        })
    })

    // get an specific promotion data, query by slug property
    router.get('/formdata/promotions/:slug', function (req, res) {
      let iterable = [
        crudInst.getItem({
          collection: conf.db.collections.main,
          query: { slug: req.params.slug },
          items_per_page: 1
        }),
        crudInst.getItems({
          collection: conf.db.collections.secundary,
          items_per_page: 100,
          projection: { name: 1 },
          sort: { name: 1 }
        }),
        crudInst.getItems({
          collection: conf.db.collections.categories,
          items_per_page: 100,
          projection: { name: 1 },
          sort: { name: 1 }
        })
      ]

      Promise.all(iterable)
        .then(function (results) {
          res.json({
            item: results[0],
            allStores: results[1],
            allCategories: results[2]
          })
        })
        .catch(function (error) {
          res.json(error)
        })
    })

    return that
  }

  /**
   * Updates each category and store of a promotion, so the modified property is updated.
   * The modified property is useful for sitemaps, structure data and for users knowing the last update
   * of the promotion.
   * @param  {Object} data The object that contains an array of stores and an array of categories
   * @param  {Date}   date Date for "modified" property for each category and store
   * @return {Promise}     Promise to know when the task is done
   */
  function updateStoresAndCategories (data, date) {
    let iterable = data.categories.map(function (currCat) {
      return spec.crud.updateOne({
        collection: spec.config.db.collections.categories,
        query: { _id: currCat._id },
        update: { $set: { modified: date } }
      })
    })

    //  We are not using map because then we have to merge with concat and left two arrays of promises running
    data.stores.forEach(function (currStore) {
      iterable.push(spec.crud.updateOne({
        collection: spec.config.db.collections.secundary,
        query: { _id: currStore._id },
        update: { $set: { modified: date } }
      }))
    })

    return Promise.all(iterable)
  }

  function updateSitemaps () {
    let csm = spec.csm

    //  Update sitemaps
    return new Promise(function (resolve, reject) {
      return Promise.all([
        csm.pages(),
        csm.offers(),
        csm.stores(),
        csm.categories(),
        csm.elBuenFin()
      ])
        .then(function (results) {
          if (results && results.length > 0) {
            csm.index().then(function (res) {
              resolve(res)
            })
          }
        })
        .catch(function (err) {
          reject(Error(err))
        })
    })
  }

  function sendPushNotification (data) {
    //  Push notifications
    spec.pn.all({
      title: data.title,
      url: spec.config.host + spec.config.routes.main + '/' + data.slug,
      message: data.meta_description

      //  @TODO: To set an image to the notifications using pushcrew, we need to create an PNG imgage 192X192
      //  ,image_url: data.thumbnail
    })
  }

  /**
   * Creates or update an Offer(promotion), when editing the query is by slug
   * @param  {[type]} params Until now it contains the path of the request
   * @return {Object}        For cascade purpose
   */
  function save (params) {
    let conf = spec.config
    let crudInst = spec.crud

    spec.router.post(params.path, function (req, res) {
      let rightNow = new Date()
      let missingData = { modified: rightNow }
      let data = Object.assign(req.body, missingData)

      if (!data.hasOwnProperty('published')) {
        data.published = rightNow
      } else {
        // asegurandonos que se guarde como un campo tipo fecha
        data.published = new Date(data.published)
      }

      crudInst.update({
        collection: conf.db.collections.main,
        query: { slug: req.params.slug },
        update: { $set: data },
        options: {
          upsert: true
        }
      })
        .then(function (dbResponse) {
        //  return response to client with res object
          res.json(dbResponse)
          return dbResponse
        })
        .catch(function (err) {
          console.log('Ocurrió un error al tratar de Guardar una promoción:')
          console.log(err)
          res.json(err)
        })
        .then(function (dbResponse) {
          if (dbResponse.result && dbResponse.result.ok) {
            // sendPushNotification(data)

            return crudInst.update({
              collection: conf.db.collections.pages,
              query: {},
              update: { $set: { modified: rightNow } },
              options: { multi: true }
            })
          }
        })
        .catch(function (err) {
          console.log('Ocurrió un error al tratar de actualizar las paginas despues de guardar una promoción:')
          console.log(err)
        })
        .then(function (dbResponse) {
          if (dbResponse && dbResponse.result && dbResponse.result.ok) {
            return updateStoresAndCategories({
              stores: data.stores,
              categories: data.categories
            }, rightNow)
          } else {
            return Error(dbResponse)
          }
        })
        .catch(function (err) {
          console.log('Ocurrió un error al tratar de actualizar tiendas y categorias despues de guardar una promoción:')
          console.log(err)
        })
        .then(function (results) {
          if (results && results.length > 0) {
          //  Update feed
            spec.feed.create()
            return updateSitemaps()
          }
        })
        .catch(function (err) {
          console.log('Ocurrió un error al tratar de actualizar los sitemas y el feed despues de guardar una promoción:')
          console.log(err)
        })
    })

    return that
  };

  that.save = save
  that.getFormData = getFormData
  that.getBySlug = getBySlug
  that.existsBySlug = existsBySlug

  return that
}
