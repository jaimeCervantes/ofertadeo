var cron = require('node-cron');
var csm = require('./create-sitemap.js');


cron.schedule('*/1 * * * *', function (){//run every 5 minutes after midnigh everyday
  csm.pages();
});

cron.schedule('*/1 * * * *', function () {//run every 6 hours
  csm.offers();
});

cron.schedule('*/1 * * * *', function () {//run every 5 minutes after midnigh everyday
  csm.index();
});