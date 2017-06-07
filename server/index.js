import Nuxt from 'nuxt'
import express from 'express'
import compression from 'compression'
var cron = require('node-cron');
var spawn = require('child_process').spawn;


import api from './api'

var bodyParser = require('body-parser');

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let nuxtConfig = require('../nuxt.config.js')
nuxtConfig.dev = !(process.env.NODE_ENV === 'production')

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

cron.schedule('5 0 * * *', function(){//run every 5 minutes after midnigh everyday
//cron.schedule('*/1 * * * *', function(){//run every 1 minute
  var sm = spawn('node', ['./server/utils/sitemaps/create-sitemap.js']);
  sm.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  sm.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  sm.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});
