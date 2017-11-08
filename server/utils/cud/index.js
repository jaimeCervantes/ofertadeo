const utils = require('../index.js')
// const config = require('../../config.js')
// let conf = config()

let csm = require('../sitemaps/create-sitemap.js')
// const cudUtils = require('./utils')
// cudUtils.update({
//  collections: ['offers', 'pages', 'categories', 'stores'],
//  query: { published: { $exists: true} },
//  projection: { published: 1 },
//  callback: function (conn, coll, doc) {
//    console.log(doc);
//    conn.collection(coll).updateOne({_id: doc._id}, { $set: { published: new Date(doc.published) } })
//  }
// });

// cudUtils.update({
//  collections: ['offers', 'pages', 'categories', 'stores'],
//  query: { modified: { $exists: true} },
//  projection: { modified: 1 },
//  callback: function (conn, coll, doc) {
//    console.log(doc);
//    conn.collection(coll).updateOne({_id: doc._id}, { $set: { modified: new Date(doc.modified) } })
//  }
// });

// Update sitemaps
// csm.pages();
// csm.offers();
// csm.stores();
// csm.categories();
// csm.index();

csm.elBuenFin()

// var crudInst = utils.getCrud()
// crudInst.then(function (crud) {
//   return crud.getItems({
//     collection: conf.db.collections.main,
//     projection: { categories: 1, stores: 1 },
//     items_per_page: 200
//   })
// })
// // Obtener el nombre de la tienda y de la categoria de cada oferta
//   .then(function (docs) {
//     return Promise.all(docs.map(function (doc) {
//       return crudInst.then(function (crud) {
//         return crud.getItem({
//           collection: conf.db.collections.secundary,
//           query: { _id: doc.stores[0] },
//           projection: { name: 1 }
//         })
//       })
//         .then(function (store) {
//           return crudInst
//             .then(function (crud) {
//               return crud.getItem({
//                 collection: conf.db.collections.categories,
//                 query: { _id: doc.categories[0] },
//                 projection: { name: 1 }
//               })
//             })
//             .then(function (cat) {
//               return { _id: doc._id, categories: [cat], stores: [store] }
//             })
//         })
//         .catch(function (err) {
//           console.log(err)
//           return Error(err)
//         })
//     }))
//   })
// // Ya que tenemos las categorias y tiendas de cada oferta, la actualizamos
//   .then(function (docs) {
//     docs.forEach(function (doc) {
//       console.log(doc)
//       crudInst
//         .then(function (crud) {
//           crud.updateOne({
//             collection: conf.db.collections.main,
//             query: {_id: doc._id},
//             update: { $set: { categories: doc.categories, stores: doc.stores } }
//           })
//         })
//     })
//   })
//   .catch(function (err) {
//     console.log(err)
//   })
