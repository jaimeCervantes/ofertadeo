let router = require('express').Router();
let wagner = require('wagner-core');
let home = require('./home');
let categories = require('./categories');
let stores = require('./stores');
let promotions = require('./promotions');
let upload = require('./upload');
let seo = require('./seo');

require('../config.js')(wagner);
require('../db/connection.js')(wagner);

router.use(home(wagner))
router.use(categories(wagner))
router.use(stores(wagner))
router.use(promotions(wagner))
router.use(upload(wagner))
router.use(seo(wagner))

export default router
