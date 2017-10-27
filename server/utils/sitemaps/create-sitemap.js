var utils = require('../index.js')
var smUtils = require('./utils.js')
var config = require('../../config')
var fs = require('fs')
var request = require('request')
var rootXml = config.paths.xml
var offers = 'sitemap-offers.xml'
var pagesName = 'sitemap-pages.xml'
var storesName = 'sitemap-stores.xml'
var elBuenFinName = 'sitemap-el-buen-fin.xml'
var categoriesName = 'sitemap-categories.xml'

function getData (params) {
  return utils.getCrud()
    .then(function (crud) {
      return crud.getItems({
        collection: params.collection || config.db.collections.main,
        query: params.query || {},
        projection: params.projection || { slug: 1, modified: 1, img: 1, img_title: 1, img_alt: 1 },
        items_per_page: params.items_per_page || 10000,
        sort: { published: -1 }
      }).catch(function (err) {
        return err
      })
    })
    .catch(function (err) {
      return err
    })
}

function smPages () {
  var modified = utils.getDate()
  var compoundSitemap = smUtils.createSitemap()

  compoundSitemap.add({url: '/', changefreq: 'daily', priority: 1.0, lastmodISO: modified})
  compoundSitemap.add({url: '/el-buen-fin', changefreq: 'weekly', priority: 0.9, lastmodISO: modified})
  compoundSitemap.add({url: '/el-buen-fin/tiendas', changefreq: 'weekly', priority: 0.8, lastmodISO: modified})

  return getData({ collection: config.db.collections.pages })
    .then(function (data) {
      return smUtils.addToSitemap(compoundSitemap, data, {
        route: '',
        changefreq: 'weekly',
        priority: 0.6
      })
    })
    .then(function (algo) {
      return smUtils.createSitemapFile(compoundSitemap, {
        sitemap_path: rootXml + '/' + pagesName,
        sitemapName: pagesName
      })
    })
    .catch(function (err) {
      return err
    })
}

function smCategories () {
  var smCategories = smUtils.createSitemap()
  return getData({ collection: config.db.collections.categories })
    .then(function (data) {
      smUtils.addToSitemap(smCategories, data, {
        route: config.routes.categories,
        changefreq: 'weekly',
        priority: 0.8
      })
    })
    .then(function () {
      return smUtils.createSitemapFile(smCategories, {
        sitemap_path: rootXml + '/' + categoriesName,
        sitemapName: categoriesName
      })
    })
    .catch(function (err) {
      return err
    })
}

function smStores () {
  var smStores = smUtils.createSitemap()
  return getData({ collection: config.db.collections.secundary })
    .then(function (data) {
      return smUtils.addToSitemap(smStores, data, {
        route: config.routes.storeList,
        changefreq: 'weekly',
        priority: 0.8
      })
    })
    .then(function () {
      return smUtils.createSitemapFile(smStores, {
        sitemap_path: rootXml + '/' + storesName,
        sitemapName: storesName
      })
    })
    .catch(function (err) {
      return err
    })
}

function smElBuenFin () {
  var smStores = smUtils.createSitemap()
  return getData({ collection: config.db.collections.elBuenFin })
    .then(function (data) {
      return smUtils.addToSitemap(smStores, data, {
        route: config.routes.elBuenFin,
        changefreq: 'weekly',
        priority: 0.8
      })
    })
    .then(function () {
      return smUtils.createSitemapFile(smStores, {
        sitemap_path: rootXml + '/' + elBuenFinName,
        sitemapName: elBuenFinName
      })
    })
    .catch(function (err) {
      return err
    })
}

function smOffers () {
  var offersSitemap = smUtils.createSitemap()

  return getData({ collection: config.db.collections.main })
    .then(function (data) {
      smUtils.addToSitemap(offersSitemap, data, {
        route: config.routes.main,
        changefreq: 'monthly',
        priority: 0.6
      })
    })
    .then(function () {
      return smUtils.createSitemapFile(offersSitemap, {
        sitemap_path: rootXml + '/' + offers,
        sitemapName: offers
      })
    })
    .catch(function (err) {
      return err
    })
}

function smIndex () {
  let iterable = [
    new Promise(function (resolve, reject) {
      fs.stat(`${rootXml}/${pagesName}.gz`, function (err, stat) {
        if (err) {
          reject(err)
        }
        resolve(stat)
      })
    }),
    new Promise(function (resolve, reject) {
      fs.stat(`${rootXml}/${offers}.gz`, function (err, stat) {
        if (err) {
          reject(err)
        }
        resolve(stat)
      })
    }),
    new Promise(function (resolve, reject) {
      fs.stat(`${rootXml}/${storesName}.gz`, function (err, stat) {
        if (err) {
          reject(err)
        }
        resolve(stat)
      })
    }),
    new Promise(function (resolve, reject) {
      fs.stat(`${rootXml}/${categoriesName}.gz`, function (err, stat) {
        if (err) {
          reject(err)
        }
        resolve(stat)
      })
    }),
    new Promise(function (resolve, reject) {
      fs.stat(`${rootXml}/${elBuenFinName}.gz`, function (err, stat) {
        if (err) {
          reject(err)
        }
        resolve(stat)
      })
    })
  ]

  return new Promise(function (resolve, reject) {
    Promise.all(iterable)
      .then(function (results) {
        var content = `<?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <sitemap>
          <loc>${config.host}/${pagesName}.gz</loc>
          <lastmod>${utils.getDate(results[0].mtime)}</lastmod>
        </sitemap>
        <sitemap>
          <loc>${config.host}/${offers}.gz</loc>
          <lastmod>${utils.getDate(results[1].mtime)}</lastmod>
        </sitemap>
        <sitemap>
          <loc>${config.host}/${storesName}.gz</loc>
          <lastmod>${utils.getDate(results[2].mtime)}</lastmod>
        </sitemap>
        <sitemap>
          <loc>${config.host}/${categoriesName}.gz</loc>
          <lastmod>${utils.getDate(results[3].mtime)}</lastmod>
        </sitemap>
        <sitemap>
          <loc>${config.host}/${elBuenFinName}.gz</loc>
          <lastmod>${utils.getDate(results[4].mtime)}</lastmod>
        </sitemap>
        </sitemapindex>`

        fs.writeFile(rootXml + '/sitemap.xml', content, 'utf8', function (err) {
          if (err) {
            console.log(Error(err))
            reject(Error(err))
          }
          smUtils.compress(rootXml + '/sitemap.xml')
          console.log('Index sitemap is created :=)')
          resolve('Index sitemap is created :=)')
        })
      })
      .catch(function (err) {
        console.log(Error(err))
        reject(err)
      })
  })
}

function ping () {
  if (config.app_status === 'deploy') {
    request('https://www.google.com/webmasters/sitemaps/ping?sitemap=https://www.ofertadeo.com/sitemap.xml', function (error, response, body) {
      if (error) {
        console.log('------------------------------------------')
        console.log(utils.getDate())
        console.log('error: ', error)
        console.log('------------------------------------------')
        return
      }
      console.log('------------------------------------------')
      console.log(utils.getDate())
      console.log('success ping to GOOGLE sitemap!!:')
      console.log('------------------------------------------')
      console.log(body)
    })

    request('https://www.bing.com/webmaster/ping.aspx?siteMap=https://www.ofertadeo.com/sitemap.xml', function (error, response, body) {
      if (error) {
        console.log('------------------------------------------')
        console.log(utils.getDate())
        console.log('error: ', error)
        console.log('------------------------------------------')
        return
      }
      console.log('------------------------------------------')
      console.log(utils.getDate())
      console.log('success ping to BING sitemap!!:')
      console.log('------------------------------------------')
      console.log(body)
    })
  }
}

module.exports = {
  index: smIndex,
  pages: smPages,
  offers: smOffers,
  stores: smStores,
  elBuenFin: smElBuenFin,
  categories: smCategories,
  ping: ping
}
