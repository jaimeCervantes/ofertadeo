let router = require('express').Router()
let config = require('../config.js')
let conn = require('../db/connection.js')(config)
let crud = require('../db/crud.js')
let commonDbParams = require('../db/common-db-params.js')
let csm = require('../utils/sitemaps/create-sitemap.js')
let feed = require('../utils/feed/')
let pn = require('../utils/pn/')

let home = require('./home')
let categories = require('./categories')
let promotions = require('./promotions')
let stores = require('./stores')
let upload = require('./upload')
let seo = require('./seo')
let elBuenFin = require('./elBuenFin')

// router.all('*', function(req, res, next) {
//   console.log(req.path)

//   //if is autthenticated got to next
//   next() //to allow other middlewares to be executed

//   //otherwise redirect
// })

home({ router: router, crud: crud, conn: conn, config: config })

categories({
  conn: conn,
  config: config,
  crud: crud,
  router: router,
  handler: require('./handlers/categories'),
  csm: csm,
  commonDbParams: commonDbParams
})

promotions({
  conn: conn,
  config: config,
  crud: crud,
  router: router,
  handler: require('./handlers/promotions'),
  csm: csm,
  feed: feed,
  pn: pn
})

stores({
  conn: conn,
  config: config,
  crud: crud,
  router: router,
  handler: require('./handlers/stores'),
  csm: csm,
  commonDbParams: commonDbParams
})

upload({
  conn: conn,
  config: config,
  crud: crud,
  router: router,
  handler: require('./handlers/upload')
})

seo({
  conn: conn,
  config: config,
  crud: crud,
  router: router,
  handler: require('./handlers/seo')
})

elBuenFin({
  conn: conn,
  config: config,
  crud: crud,
  router: router,
  handler: require('./handlers/elBuenFin'),
  csm: csm,
  commonDbParams: commonDbParams
})

export default router
