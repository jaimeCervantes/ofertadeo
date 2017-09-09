let router = require('express').Router()
let config = require('../config.js')
let conn = require('../db/connection.js')(config)
let crud = require('../db/crud.js')
let csm = require('../utils/sitemaps/create-sitemap.js')
let feed = require('../utils/feed/')
let pn = require('../utils/pn/')

let home = require('./home')
let categories = require('./categories')
let promotions = require('./promotions')
let stores = require('./stores')
let upload = require('./upload')
let seo = require('./seo')

home({ router: router, crud: crud, conn: conn, config: config })

categories({
  conn: conn,
  config: config,
  crud: crud,
  router: router,
  handler: require('./handlers/categories')
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
  csm: csm
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

export default router
