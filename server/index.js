import Nuxt from 'nuxt'
import express from 'express'
import compression from 'compression'
var cron = require('node-cron');
var csm = require('./utils/sitemaps/create-sitemap.js');
var helmet = require('helmet')
var develop = !(process.env.NODE_ENV === 'production')
import api from './api'

var bodyParser = require('body-parser');

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

//For some reason in develop, express precondition provoke an error when the user load more
//offers using ajax
if(!develop) {
	//var preconditions = require('express-preconditions');
	//app.use(preconditions())
}

// Import API Routes
app.use('/api', api)
//Security
app.use(helmet())
app.disable('x-powered-by');

// Import and Set Nuxt.js options
let nuxtConfig = require('../nuxt.config.js')
nuxtConfig.dev = develop

// Init Nuxt.js
const nuxt = new Nuxt(nuxtConfig)
//before nuxt render to compress data
app.set('view cache', true);//Cache template compilation
app.use(compression());//Compress all the data that the server response

//At the end because it won't call next()
app.use(nuxt.render)

// Build only in dev mode
if (nuxtConfig.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error) // eslint-disable-line no-console
    process.exit(1)
  })
}

// Listen the server
app.listen(port)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console

cron.schedule('5 0 * * *', function (){//run every 5 minutes after midnigh everyday
  csm.pages();
});

cron.schedule('5 0,6,12,18 * * *', function () {//run every 6 hours
  csm.offers();
});

cron.schedule('5 0 * * *', function () {//run every 5 minutes after midnigh everyday
  csm.index();
});