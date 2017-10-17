var crud = require('../db/crud.js')
let config = require('../config.js')
let conn = require('../db/connection.js')(config)

function getCrud () {
  return conn.then(function (db) {
    return crud({ db: db, config: config })
  })
}

function formatDateStr (date, format) {
  var dateStr = new Date(date)
  if (format && format.toUpperCase() === 'GMT') {
    return dateStr.toGMTString().split('GMT')[0] + '-0500'
  }
  return dateStr.toISOString().split('.')[0] + '-05:00'
}

function getDate (dateObj, format) {
  var date
  if (dateObj) {
    date = new Date(dateObj)
  } else {
    date = new Date()
  }

  var substract = date.getTime() - (300 * 60 * 1000)// minus 5 hrs

  return formatDateStr(substract, format)
}

function checkIfNewOffers () {
  return getCrud()
    .then(function (crud) {
      return crud.getItem({
        collection: config.db.collections.main,
        query: {},
        sort: { published: -1 },
        projection: { published: 1 }
      })
    })
    .then(function (doc) {
      let lastOfferDate = new Date(doc.published)
      let lastOfferDateTime = new Date(doc.published).getTime()
      let hours = 12 * 60 * 60 * 1000
      let minus12hrsDateTime = new Date().getTime() - hours
      let minus12hrsDate = new Date(minus12hrsDateTime)
      let resp = {
        lastOffer: doc.published,
        lastOfferDate: getDate(lastOfferDate),
        lastOfferDateTime: lastOfferDateTime,
        minus12hrsDate: getDate(minus12hrsDate),
        minus12hrsDateTime: minus12hrsDateTime,
        news: false
      }

      if (lastOfferDateTime >= minus12hrsDateTime) {
        resp.news = true
        return resp
      }

      return resp
    })
}

module.exports = {
  getDate: getDate,
  checkIfNewOffers: checkIfNewOffers,
  getCrud: getCrud
}
