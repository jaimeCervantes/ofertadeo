var cron = require('node-cron');
var csm = require('./create-sitemap.js');


var schedule = {
	ping: ping
};

function ping () {
	cron.schedule('* 12 * * *', function (){//run every 5 minutes after midnigh everyday
	  csm.ping();
	});

	cron.schedule('50 23 * * *', function () {//run every 6 hours
	  csm.ping();
	});	
}

module.exports = schedule