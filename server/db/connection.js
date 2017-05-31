'use strict';

var MongoClient = require('mongodb').MongoClient;
 
function getConnection(config) {
  //connPromise is pending when trying to connect to mongodb atlas
  // var shards = config.db.shard1 + ',' + config.db.shard2 + ',' + config.db.shard3;
  // var url = 'mongodb://' + config.db.user + ':' + config.db.password + '@' + shards + '/' + config.db.name + config.db.queryString;
  var url = 'mongodb://' + config.db.user + ':' + config.db.password + '@' + config.db.host + '/' + config.db.name;

  return MongoClient.connect(url).then(function(conn){
      console.log('It is connected to db: ' + config.db.name);
      return conn;
    })
    .catch(function(err) {
      console.log(err);
      return err;
    });
}

module.exports = function(wagner) {
  wagner.invoke(function(config) {
    var conn = getConnection(config);
    wagner.factory('conn', function() {
      return conn;
    });
  });
  
};