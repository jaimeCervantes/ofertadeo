
'use strict';

module.exports = function(wagner, params) {
  wagner.invoke(function(conn, config) {
    conn
    .then(function(db) {
      return {
        crud: params.crud({ db:db, config: config }),
        config: config
      };
    })
    .then(function(resp){
      if(resp && resp.crud && resp.config) {
        resp.router = params.router;
        params.handler(resp)
        .slug()
        .getFormDataPromotions()
        .savePromotion({ path: '/promotions/new' })  // Create new Offer
        .savePromotion({ path: '/promotions/edit/:slug' }); // Edit an Offer
      }
    })
    .catch(function(err) {
      //some configuration to notify no database connection working
      console.log(err);
    });
  });
};