'use strict';

module.exports = function(wagner, params) {
  wagner.invoke(function(conn, config) {
    conn
    .then(function(db){
      return {
        crud: params.crud({ db:db, config: config }),
        config: config
      };
    })
    .then(function(resp){
      if(resp && resp.crud && resp.config) {
        resp.router = params.router;
        index(resp);  
      } else {
        console.log('There is not database instance');
      }
      
    })
    .catch(function(err) {
      //some configuration to notify no database connection working
      console.log(err);
    });
  });
};

// We can define functions after use them because of function hoisting
function index(params) {
  let crudInst = params.crud;
  let conf = params.config;
  params.router.get('/home', function(req, res) {
    let page = req.query.page ? Number(req.query.page) : 0;
    let iterable = [
      crudInst.getItems({
        collection: conf.db.collections.main,
        items_per_page: conf.db.itemsPerPage, 
        skip: conf.db.itemsPerPage*page,
        sort: { published: -1},
        projection: {
          name: 1,
          thumbnail: 1,
          stores: 1,
          slug: 1,
          img: 1,
          img_data: 1,
          img_alt: 1,
          img_title: 1,
          title: 1,
          published: 1,
          modified: 1
        }
      }),
      crudInst.getPagination({
        collection: conf.db.collections.main
      })
    ];

    Promise.all(iterable)
    .then(function(results) {
      res.json({
          items: results[0],
          pagination: results[1]
        });
    })
    .catch(function(error) {
      res.json(error);
    });
  });
}