'use strict'

module.exports = function (params) {
  params.conn
  .then(function (db) {
    return params.crud({ db: db, config: params.config })
  })
  .then(function (crud) {
    if (crud) {
      params.handler({ crud: crud, config: params.config, router: params.router })
      .getById()
      .getIndex()
    } else {
      console.log('There is not database instance')
    }
  })
  .catch(function (error) {
    console.log(error)
  })
}
