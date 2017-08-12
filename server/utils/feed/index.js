var config = require('../../config.js').config;
var wagner = require('wagner-core');
var Crud = require(config.paths.server + '/db/crud.js');
var Feed = require('./feed');
var fs = require('fs');
var striptags = require('striptags');
var utils = require(config.paths.server + '/utils/index.js');

require('../../config.js')(wagner)
require(config.paths.server + '/db/connection.js')(wagner);

config.paths.static = '/home/jaime/static/feed';

wagner.invoke(function(conn){
	return conn;
})
.then(function(conn){
	return new Crud({ db: conn })
})
.then(function(crud){
	return crud.getItems({
		collection: config.db.collections.main,
		items_per_page: 10,
		sort: { published: -1}
	});
})
.then(function(docs){
	var feedXml = new Feed({
		title: 'Ofertadeo',
		description: 'Nuevas ofertas',
		link: config.host,
		image: config.host + '/logo.png',
	  favicon: config.host + '/favicons/favicon.ico',
	  copyright: 'All rights reserved 2013, John Doe',
	  updated: new Date(),
	  generator: 'ofertadeo',
	  feedLinks: {
	    json: config.host + '/feed/json',
	    atom: config.host + '/feed/atom',
	  }
	});

	docs.forEach(function(doc) {
		let content = striptags(doc.content);
    let description = content.slice(0, 150);
    if (description.length === 150) {
    	description += '...';
    }
		feedXml.addItem({
	    title: doc.title,
	    link: config.host + config.routes.main + '/' + doc.slug,
	    description: description,
	    content: doc.content,
	    category: doc.categories[0],
	    date: doc.published,
	    image: doc.img
	  });
	});

	fs.writeFile(config.paths.static + '/feed-rss2.xml', feedXml.rss2(), 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('RSS2 was created :=)');
  });

  fs.writeFile(config.paths.static + '/feed-atom.xml', feedXml.atom1(), 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('Atom was created :=)');
  });

  fs.writeFile(config.paths.static + '/feed-json.json', feedXml.atom1(), 'utf8', function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('JSON was created :=)');
  });

})
.then(function(){
	console.log('OK')
})
.catch(function(err){
	console.log(err);
});