let router = require('express').Router();
let wagner = require('wagner-core');

let routesHome = require('./home');

let categories = require('./categories');
let stores = require('./stores');

let promotions = require('./handlers/promotions');
let routesPromotions = require('./promotions');

let upload = require('./upload');
let seo = require('./seo');
let crud = require('../db/crud.js');

require('../config.js')(wagner);
require('../db/connection.js')(wagner);

routesHome(wagner, { router: router, crud: crud })

router.use(categories(wagner))
router.use(stores(wagner))

routesPromotions(wagner, { router: router, crud: crud, handler: promotions })

router.use(upload(wagner))
router.use(seo(wagner))

export default router
