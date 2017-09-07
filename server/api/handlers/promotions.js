/**
 * Promotions routes and functionality for promotions requests
 * @param  {Object} spec Dependencies and more parameters for the correct behaviour
 * @return {Object}
 */
module.exports = function (spec) {
  let that = {}
  spec = spec || {}

  function getBySlug () {
    spec.router.get('/promotions/:slug', function (req, res) {
      let iterable = [
        spec.crud.getItem({
          collection: spec.config.db.collections.main,
          query: { slug: req.params.slug },
          items_per_page: 1
        })
      ]

      return Promise.all(iterable)
            .then(function (results) {
              res.json({
                item: results[0]
              })
            })
            .catch(function (error) {
              res.json(error)
            })
    })

    return that
  }

  /**
   * Contains the request for creating and editing Offers(promotions)
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

    // get an specific promotions, query by slug property
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
   * @param  {Date}   date Date for modified property for each category and store
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
        csm.categories()
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
   * Creates or update an Offer(promotion)
   * @param  {[type]} params Until now it contains the path of the request
   * @return {Object}        For cascade purpose
   */
  function save (params) {
    let conf = spec.config
    let crudInst = spec.crud

    spec.router.post(params.path, function (req, res) {
      let rightNow = new Date()
      let missingData = { modified: rightNow }
      let data = Object.assign(missingData, req.body)

      if (!data.published) {
        data.published = rightNow
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
          sendPushNotification(data)

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
          },
            rightNow
          )
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
  }

  that.save = save
  that.getFormData = getFormData
  that.getBySlug = getBySlug

  return that
}
