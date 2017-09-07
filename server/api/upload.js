'use strict'

module.exports = function (params) {
  params.conn
  .then(function (db) {
    return params.crud({ db: db, config: params.config })
  })
  .then(function (crud) {
    if (crud) {
      params.handler({ crud: crud, config: params.config, router: params.router })
      .upload()
    } else {
      console.log('There is no crud instance')
    }
  })
  .catch(function (err) {
    // some configuration to notify no database connection working
    console.log(err)
  })
}
