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
ObjectID = require('mongodb').ObjectID;
Moment = require('moment');


module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SchoolMangeController)
   */
  dashboard: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body);
    req.session.sc_code = criteria.sc_code;
    
    // console.log(req.session)
    
    my_sc_code = req.session.sc_code;


    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      // db.collection('service').find( { });

      db.collection('school').findOne({ sc_code: my_sc_code }, function(err, schoolData){
        if(err) return next(err);
        // console.log(schoolData)
        
        req.session.is_yamaha_school_network = schoolData.is_yamaha_school_network;

        // console.log(req.session)
        
        db.collection('student').find({ sc_code: my_sc_code }).toArray(function(err, studentData){
          student_count = studentData.length;
          
          db.collection('teacher').find({ sc_code: my_sc_code }).toArray(function(err, teacherData){
          teacher_count = teacherData.length;
            
            db.close();

            res.view({
              title: schoolData.school_name_en,
              sc_code: my_sc_code,
              schoolData: schoolData,
              student: studentData,
              teacher: teacherData,
              counting:{
                student: student_count,
                teacher: teacher_count
              },
              layout: '/layout/school_layout'
            })



          });
        });
        
    


      })

    })// end connect mongodb 


  }

  
};
