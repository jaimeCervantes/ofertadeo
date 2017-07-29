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
		let dateMinus12hrs = new Date().getTime() - hours;
		if(lastOfferDateTime >= dateMinus12hrs) {
			return {
				lastOffer: doc.modified,
				lastOfferDateTime: lastOfferDateTime,
				minus12hrsDateTime: dateMinus12hrs,
				ping: true
			};
		}
		return false;
	});
}



function ping () {
	//cron.schedule('* 12 * * *', function (){//run every 5 minutes after midnigh everyday
	cron.schedule('*/1 * * * *', function (){//run every 5 minutes after midnigh everyday
	  checkDate().then(function(res) {
	  	if(res && res.ping) {
	  		console.log(res)
	  		csm.ping()
	  	}
	  }).catch(function(err) {
	  	console.log(err);
	  });
	});

	cron.schedule('50 23 * * *', function () {//run every 6 hours
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