var utils = require('./utils.js');
var config = require('../../config')();
var sm = require('sitemap')
var fs = require('fs');

config.paths.static = '/home/jaime/xml';
var offers = '/sitemap-ofertas.xml';
var stores_categories_pages = '/sitemap-paginas.xml';


function smPages () {
  var modified = utils.getDate();
  var compoundSitemap = utils.createSitemap();
  compoundSitemap.add({url: '/', changefreq: 'daily', priority: 1.0, lastmodISO: modified});
  compoundSitemap.add({url: config.routes.storeList, changefreq: 'weekly', priority: 0.7, lastmodISO: modified});
  compoundSitemap.add({url: config.routes.categoriesList, changefreq: 'weekly', priority: 0.7, lastmodISO: modified});

  utils.getData( { collection: 'stores'} )
  .then(function(data) {
    utils.addToSitemap(compoundSitemap, data,  {
      route: config.routes.storeList,
      changefreq: 'daily',
      priority: 0.9
    });
  })
  .then(function() {
    utils.getData( { collection: 'categories'} )
    .then(function(data) {
      utils.addToSitemap(compoundSitemap, data,  {
        route: config.routes.categories,
        changefreq: 'daily',
        priority: 0.9
      });

      utils.createSitemapFile(compoundSitemap, {
        sitemap_path: config.paths.static + stores_categories_pages,
        sitemapName: stores_categories_pages
      });

    });
  });
}


function smOffers () {
  var offersSitemap = utils.createSitemap();

  utils.getData({collection: config.db.mainCollection })
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
  <loc>https://www.ofertadeo.com/sitemaps/sitemap-paginas.xml</loc>
  <lastmod>` + utils.getDate() +`</lastmod>
</sitemap>
<sitemap>
  <loc>https://www.ofertadeo.com/sitemaps/sitemap-ofertas.xml</loc>
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


module.exports = {
  index: smIndex,
  pages: smPages,
  offers: smOffers
};