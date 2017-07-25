var utils = require('./utils.js');
var config = require('../../config')();
var sm = require('sitemap')
var fs = require('fs');
var request = require('request');

config.paths.static = '/home/jaime/xml';
var offers = '/sitemap-ofertas.xml';
var stores_categories_pages = '/sitemap-paginas.xml';

function smPages () {
  var modified = utils.getDate();
  var compoundSitemap = utils.createSitemap();
  
  compoundSitemap.add({url: '/', changefreq: 'daily', priority: 1.0, lastmodISO: modified});

  utils.getData({ collection: config.db.collections.pages })
  .then(function(data) {
    utils.addToSitemap(compoundSitemap, data,  {
      route: '',
      changefreq: 'weekly',
      priority: 0.7
    });
  })
  .then(function () {
    return utils.getData( { collection: config.db.collections.secundary } )  
  })
  .then(function(data) {
    utils.addToSitemap(compoundSitemap, data,  {
      route: config.routes.storeList,
      changefreq: 'daily',
      priority: 0.9
    });
  })
  .then(function() {
    return utils.getData( { collection: config.db.collections.categories } );
  })
  .then(function(data) {
     utils.addToSitemap(compoundSitemap, data,  {
      route: config.routes.categories,
      changefreq: 'daily',
      priority: 0.9
    });
  })
  .then(function(){
    utils.createSitemapFile(compoundSitemap, {
      sitemap_path: config.paths.static + stores_categories_pages,
      sitemapName: stores_categories_pages
    });    
  })
}


function smOffers () {
  var offersSitemap = utils.createSitemap();

  utils.getData({collection: config.db.collections.main })
  .then(function (data) {
    utils.addToSitemap(offersSitemap, data, {
      route: config.routes.main,
      changefreq: 'daily',
      priority: 0.5
    });
  })
  .then(function() {
    utils.createSitemapFile(offersSitemap, {
      sitemap_path: config.paths.static + offers,
      sitemapName: offers
    });
  });
}

function smIndex () {
  var content = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap>
  <loc>https://www.ofertadeo.com/sitemap-paginas.xml</loc>
  <lastmod>` + utils.getDate() +`</lastmod>
</sitemap>
<sitemap>
  <loc>https://www.ofertadeo.com/sitemap-ofertas.xml</loc>
  <lastmod>` + utils.getDate() +`</lastmod>
</sitemap>
</sitemapindex>`;

  fs.writeFile(config.paths.static + '/sitemap.xml', content, 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
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
  ping: ping
};