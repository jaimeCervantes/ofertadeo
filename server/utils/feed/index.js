var config = require('../../config.js').config;
var Feed = require('./feed');
var fs = require('fs');
var striptags = require('striptags');
var utils = require('../index.js');
var cron = require('node-cron');

var rootFeed = config.paths.feed

module.exports = {

	create () {
		utils.getCrud()
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
			  copyright: 'Ofertadeo',
			  updated: new Date(),
			  generator: 'ofertadeo',
			  feedLinks: {
			    json: config.host + '/feed/feed-json.json',
			    atom: config.host + '/feed/feed-atom.xml',
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

			fs.writeFile(rootFeed + '/feed-rss2.xml', feedXml.rss2(), 'utf8', function(err) {
		    if (err) {
		      return console.log(err);
		    }
		    console.log('RSS2 was created :=)');
		  });

		  fs.writeFile(rootFeed + '/feed-atom.xml', feedXml.atom1(), 'utf8', function(err) {
		    if (err) {
		      return console.log(err);
		    }
		    console.log('Atom was created :=)');
		  });

		  fs.writeFile(rootFeed + '/feed-json.json', feedXml.atom1(), 'utf8', function(err) {
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
	},

	schedule () {
		var index = this;
		//cron.schedule('*/1 * * * *', function (){
		cron.schedule('1 12 * * *', function (){ //run every day at 12:00 hrs
		  utils
		  .checkIfNewOffers()
		  .then(function(res) {
		  	console.log('feedburne');
		  	if(res && res.news) {
		  		index.create();
		  	}
		  	console.log(res);
		  }).catch(function(err) {
		  	console.log(err);
		  });
		});

		//cron.schedule('*/1 * * * *', function (){
		cron.schedule('50 23 * * *', function () {//run every day at 23:50 hours
				utils
		  	.checkIfNewOffers()
				.then(function(res) {
					console.log('feedburne');
			  	if(res && res.news) {
			  		index.create();
			  	}
			  	console.log(res);
			  }).catch(function(err) {
			  	console.log(err);
			  });
		});	
	}
};