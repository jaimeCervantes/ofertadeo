var cron = require('node-cron');
var csm = require('./create-sitemap.js');
var utils = require('./utils.js');
var config = require('../../config.js')();


var schedule = {
	ping: ping
};

function checkDate () {
	return utils.getData({
		collecttion: config.db.collections.main,
		query: {},
		items_per_page: 1,
		sort: { _id: -1 },
		projection: { modified: 1 }
	}).then(function(doc){
		let lastOfferDate = new Date(doc.modified);
		let lastOfferDateTime = new Date(doc.modified).getTime();
		let hours = 12*60*60*1000;
		let minus12hrsDateTime = new Date().getTime() - hours;
		let minus12hrsDate = new Date(minus12hrsDateTime);
		let resp = {
			lastOffer: doc.modified,
			lastOfferDate: lastOfferDate,
			lastOfferDateTime: lastOfferDateTime,
			minus12hrsDate: minus12hrsDate,
			minus12hrsDateTime: minus12hrsDateTime,
			ping: false
		};

		if(lastOfferDateTime >= minus12hrsDateTime) {
			resp.ping = true;
			return resp;
		}

		return resp;
	});
}



function ping () {
	cron.schedule('1 12 * * *', function (){ //run every day at 12:00 hrs
	  checkDate().then(function(res) {
	  	if(res && res.ping) {
	  		csm.ping()
	  	}
	  	console.log(res);
	  }).catch(function(err) {
	  	console.log(err);
	  });
	});

	cron.schedule('50 23 * * *', function () {//run every day at 23:50 hours
			checkDate().then(function(res) {
		  	if(res && res.ping) {
		  		console.log(res)
		  		csm.ping()
		  	}
		  }).catch(function(err) {
		  	console.log(err);
		  });
	});	
}

module.exports = schedule