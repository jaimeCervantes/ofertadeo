var cron = require('node-cron')
var csm = require('./create-sitemap.js')
var utils = require('../index.js')

var schedule = {
  ping: ping
}

function ping () {
  // cron.schedule('*/1 * * * *', function (){
  cron.schedule('1 12 * * *', function () { // run every day at 12:00 hrs
    utils
    .checkIfNewOffers()
    .then(function (res) {
      console.log('sitemaps')
      if (res && res.news) {
        csm.ping()
      }
      console.log(res)
    }).catch(function (err) {
      console.log(err)
    })
  })

  // cron.schedule('*/1 * * * *', function (){
  cron.schedule('50 23 * * *', function () { // run every day at 23:50 hours
    utils
      .checkIfNewOffers()
      .then(function (res) {
        console.log('sitemaps')
        if (res && res.news) {
          console.log(res)
          csm.ping()
        }
      }).catch(function (err) {
        console.log(err)
      })
  })
}

module.exports = schedule
