var utils = require('../index.js');
var smUtils = require('./utils.js');
var config = require('../../config')();
var sm = require('sitemap')
var fs = require('fs');
var request = require('request');
var rootXml = config.paths.xml;
var offers = 'sitemap-offers.xml';
var pages_name = 'sitemap-pages.xml';
var stores_name = 'sitemap-stores.xml';
var categories_name = 'sitemap-categories.xml';


function getData (params) {
  return utils.getCrud()
    .then(function(crud){
      return crud.getItems({
          collection: params.collection || config.db.collections.main,
          query: params.query || {},
          projection: params.projection || { slug: 1, modified: 1 },
          items_per_page: params.items_per_page || 10000,
          sort: { published: -1 }
        }).catch(function(err) {
          return err;
        });
    })
    .catch(function(err){
      console.log(err)
    });
}

function smPages () {
  var modified = utils.getDate();
  var compoundSitemap = smUtils.createSitemap();
  
  compoundSitemap.add({url: '/', changefreq: 'daily', priority: 1.0, lastmodISO: modified});

  getData({ collection: config.db.collections.pages })
  .then(function(data) {
    smUtils.addToSitemap(compoundSitemap, data,  {
      route: '',
      changefreq: 'weekly',
      priority: 0.7
    });
  })
  .then(function(algo){
    smUtils.createSitemapFile(compoundSitemap, {
      sitemap_path: rootXml + '/' + pages_name,
      sitemapName: pages_name
    });    
  })
  .catch(function(err) {
    console.log(err);
  });
}

function smCategories () {
  var smCategories = smUtils.createSitemap();
  getData( { collection: config.db.collections.categories } )
  .then(function(data) {
     smUtils.addToSitemap(smCategories, data,  {
      route: config.routes.categories,
      changefreq: 'weekly',
      priority: 0.9
    });
  })
  .then(function() {
    smUtils.createSitemapFile(smStores, {
      sitemap_path: rootXml + '/' + categories_name,
      sitemapName: categories_name
    });
  })
  .catch(function(err) {
    console.log(err);
  });
}

function smStores () {
  var smStores = smUtils.createSitemap();
  getData( { collection: config.db.collections.secundary } )  
  .then(function(data) {
    smUtils.addToSitemap(smStores, data,  {
      route: config.routes.storeList,
      changefreq: 'weekly',
      priority: 0.9
    });
  })
  .then(function() {
    smUtils.createSitemapFile(smStores, {
      sitemap_path: rootXml + '/' + stores_name,
      sitemapName: stores_name
    });
  })
  .catch(function(err) {
    console.log(err);
  });
}

function smOffers () {
  var offersSitemap = smUtils.createSitemap();

  getData({collection: config.db.collections.main })
  .then(function (data) {
    smUtils.addToSitemap(offersSitemap, data, {
      route: config.routes.main,
      changefreq: 'monthly',
      priority: 0.5
    });
  })
  .then(function() {
    smUtils.createSitemapFile(offersSitemap, {
      sitemap_path: rootXml + '/' + offers,
      sitemapName: offers
    });
  })
  .catch(function(err) {
    console.log(err);
  });
}

function smIndex () {
  var content = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap>
  <loc>${config.host}/${pages_name}.gz</loc>
  <lastmod>${utils.getDate()}</lastmod>
</sitemap>
<sitemap>
  <loc>${config.host}/${offers}.gz</loc>
  <lastmod>${utils.getDate()}</lastmod>
</sitemap>
<sitemap>
  <loc>${config.host}/${stores_name}.gz</loc>
  <lastmod>${utils.getDate()}</lastmod>
</sitemap><sitemap>
  <loc>${config.host}/${categories_name}.gz</loc>
  <lastmod>${utils.getDate()}</lastmod>
</sitemap>
</sitemapindex>`;

  fs.writeFile(rootXml + '/sitemap.xml', content, 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
    smUtils.compress(rootXml + '/sitemap.xml');
    console.log('Index sitemap is created :=)');
  });
}

function ping () {
  if(config.app_status === 'deploy') {
    request('https://www.google.com/webmasters/sitemaps/ping?sitemap=https://www.ofertadeo.com/sitemap.xml', function(error, response, body) {
      if(error) {
        console.log('------------------------------------------');
        console.log(utils.getDate());
        console.log('error: ', error);
        console.log('------------------------------------------');
        return;
      }
      console.log('------------------------------------------');
      console.log(utils.getDate());
      console.log('success ping to GOOGLE sitemap!!:');
      console.log('------------------------------------------');
      console.log(body);
    });

    request('https://www.bing.com/webmaster/ping.aspx?siteMap=https://www.ofertadeo.com/sitemap.xml', function(error, response, body) {
      if(error) {
        console.log('------------------------------------------');
        console.log(utils.getDate());
        console.log('error: ', error);
        console.log('------------------------------------------');
        return;
      }
      console.log('------------------------------------------');
      console.log(utils.getDate());
      console.log('success ping to BING sitemap!!:');
      console.log('------------------------------------------');
      console.log(body);
    });
  }
}


module.exports = {
  index: smIndex,
  pages: smPages,
  offers: smOffers,
  stores: smStores,
  categories: smCategories,
  ping: ping
};