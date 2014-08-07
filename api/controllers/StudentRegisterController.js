/**
 * StudentRegisterController
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

module.exports = {
    
  


  index: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body);
    school_id = criteria.id;
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if (err) return next(err);
      db.collection('school').findOne({ sc_code: criteria.sc_code }, function(err, schoolData){
        if(err) return next(err);
        
        db.collection('student').find({ sc_code: criteria.sc_code }).toArray(function(err, studentData){
          if(err) return next(err);

          res.view({
            title: schoolData.school_name_th,
            sc_code: criteria.sc_code,
            schoolData: schoolData,
            studentData: studentData,
            layout: '/layout/school_layout'
          })

        })

      })
    })
    

  }
  
};
