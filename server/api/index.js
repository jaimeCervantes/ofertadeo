import { Router } from 'express'
var bodyParser = require('body-parser');
var wagner = require('wagner-core');
var config = require('../config.js');
var home = require('./home');

wagner.factory('config', function(){
  return config;
});
require('../db/connection.js')(wagner);

var router = Router()
// Add USERS Routes
router.use(home(wagner))

export default router
