/**
 * RegisterController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

Mongo = require('mongodb')
MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectID;
Moment = require('moment');

module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to RegisterController)
   */
  new: function(req, res, next){
    
    res.view({
      title: "Register"
    });

  },

  create: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body);

    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      // db.collection('service').find( { });

      db.collection('register').insert(criteria,  function(err, insertedSchoolData){
        if(err) { console.log(err)};
        
        db.close();
        res.redirect('/')


      })

    })// end connect mongodb 

  }

  
};
