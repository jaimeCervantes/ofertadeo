import { Router } from 'express'
var wagner = require('wagner-core');
var home = require('./home');
var categories = require('./categories');
var stores = require('./stores');
var promotions = require('./promotions');
var upload = require('./upload');


require('../config.js')(wagner);
require('../db/connection.js')(wagner);

var router = Router()
// Add USERS Routes
router.use(home(wagner))
router.use(categories(wagner))
router.use(stores(wagner))
router.use(promotions(wagner))
router.use(upload(wagner))

export default router
