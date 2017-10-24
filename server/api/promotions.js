
'use strict'

module.exports = function (params) {
  params.conn
    .then(function (db) {
      return params.crud({ db: db, config: params.config })
    })
    .then(function (crud) {
      if (crud) {
        params.handler({
          crud: crud,
          config: params.config,
          router: params.router,
          csm: params.csm,
          feed: params.feed,
          pn: params.pn
        })
          .getBySlug()
          .existsBySlug()
          .getFormData()
          .save({ path: '/promotions/new' }) // Create new Offer
          .save({ path: '/promotions/edit/:slug' }) // Edit an Offer
      }
    })
    .catch(function (err) {
    // some configuration to notify no database connection working
      console.log(err)
    })
}
