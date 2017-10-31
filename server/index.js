import { Nuxt, Builder } from 'nuxt'
import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import api from './api'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import rfs from 'rotating-file-stream'
import path from 'path'
import fs from 'fs'
import sitemapSchedule from './utils/sitemaps/schedule'
// For authentication
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import flash from 'connect-flash'
import configPassport from './utils/passport/'
import routes from './routes'

const develop = !(process.env.NODE_ENV === 'production')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
let morganFormat = 'combined'

let logDirectory = path.join(__dirname, '../log')
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})

app.set('port', port)

// For some reason in develop, express precondition provoke an error when the user load more
// offers using ajax
if (!develop) {
  // const preconditions = require('express-preconditions');
  // app.use(preconditions())
  // morganFormat = 'dev'
}

app.use(morgan(morganFormat, { stream: accessLogStream }))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({ secret: "Cdovps_2017*" }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Security
app.use(helmet())
app.disable('x-powered-by')


configPassport(passport)
// Import API Routes
app.use('/api', api)

routes(app, passport)

// Import and Set Nuxt.js options
let nuxtConfig = require('../nuxt.config.js')
nuxtConfig.dev = develop

// Init Nuxt.js
const nuxt = new Nuxt(nuxtConfig)
// before nuxt render to compress data
app.set('view cache', true)// Cache template compilation
app.use(compression())// Compress all the data that the server response

// Build only in dev mode
if (nuxtConfig.dev) {
  const builder = new Builder(nuxt)
  builder.build()
    .catch((error) => {
      console.error(error) // eslint-disable-line no-console
      process.exit(1)
    })
}

// At the end because it won't call next()
app.use(nuxt.render)

// Listen the server
app.listen(port)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
