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
          router: params.router,
          config: params.config,
          csm: params.csm,
          commonDbParams: params.commonDbParams
        })
          .getById()
          .getIndex()
          .getFormData()
          .save({ path: '/stores/new' }) // Create new store
          .save({ path: '/stores/edit/:id' }) // Edit an store
      }
    })
    .catch(function (err) {
    // some configuration to notify no database connection working
      console.log(err)
    })
}
