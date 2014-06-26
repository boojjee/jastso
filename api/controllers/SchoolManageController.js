/**
 * SchoolMangeController
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
   * (specific to SchoolMangeController)
   */
  dashboard: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body);
    console.log(criteria)
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      // db.collection('service').find( { });

      db.collection('school').findOne({ sc_code: criteria.sc_code }, function(err, schoolData){
        if(err) return next(err);
        
        res.view({
          title: schoolData.school_name_th,
          data: schoolData,
          layout: '/layout/school_layout'
        })


      })

    })// end connect mongodb 


  }

  
};
