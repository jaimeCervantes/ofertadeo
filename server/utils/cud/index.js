const cudUtils = require('./utils');
const config = require('../../config.js');
var csm = require('../sitemaps/create-sitemap.js');
let conf = config();

// cudUtils.update({
// 	collections: ['offers', 'pages', 'categories', 'stores'],
// 	query: { published: { $exists: true} },
// 	projection: { published: 1 },
// 	callback: function (conn, coll, doc) {
// 		console.log(doc);
// 		conn.collection(coll).updateOne({_id: doc._id}, { $set: { published: new Date(doc.published) } })
// 	}
// });

// cudUtils.update({
// 	collections: ['offers', 'pages', 'categories', 'stores'],
// 	query: { modified: { $exists: true} },
// 	projection: { modified: 1 },
// 	callback: function (conn, coll, doc) {
// 		console.log(doc);
// 		conn.collection(coll).updateOne({_id: doc._id}, { $set: { modified: new Date(doc.modified) } })
// 	}
// });


//Update sitemaps
csm.pages();
csm.offers();
csm.stores();
csm.categories();
csm.index();