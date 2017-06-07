var cron = require('node-cron');
var spawn = require('child_process').spawn;
 
//cron.schedule('5 0 * * *', function(){//run every 5 minutes after midnigh everyday
cron.schedule('*/1 * * * *', function(){//run every two minutes
  var sm = spawn('node', ['./server/utils/sitemaps/create-sitemap.js']);
  sm.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  sm.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  sm.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});