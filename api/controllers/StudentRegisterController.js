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

Mongo = require('mongodb')
MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectID;
Moment = require('moment');

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

          console.log(studentData);
          
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
    

  },

  register: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body);
    req.session.register_step = 1;
    req.session.register_isfinish = false;
    
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      db.collection('school').findOne({ sc_code: criteria.sc_code }, function(err, schoolData){
        db.collection('course').find({ sc_code: criteria.sc_code }).toArray(function(err, courseData){

          db.collection('student').findOne({ 
            sc_code: criteria.sc_code,
            _id: ObjectId(criteria.id) 
          }, function(err, studentData){

            res.view({
              title: schoolData.school_name_th,
              sc_code: criteria.sc_code,
              schoolData: schoolData,
              studentData: studentData,
              courseData: courseData,
              layout: '/layout/school_layout'
            })

          });
        });
      });  
    });  
  },

  register_step2: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body);
    req.session.register_step = 2;
    req.session.register_isfinish = false;

    course_selected = criteria.course;
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      db.collection('school').findOne({ sc_code: criteria.sc_code }, function(err, schoolData){
        db.collection('course').findOne(
          { 
            sc_code: criteria.sc_code , 
            _id : ObjectId(course_selected) 
          }
          ,function(err, mycourse){

            db.collection('student').findOne({ 
              sc_code: criteria.sc_code,
              _id: ObjectId(criteria.id) 
            }, function(err, studentData){

              db.collection('teacher').find({ 
                sc_code: criteria.sc_code ,
                course: { $in: [course_selected ] }
              }).toArray(function(err, teacherData){
                console.log(teacherData)
                res.view({
                  title: schoolData.school_name_th,
                  sc_code: criteria.sc_code,
                  schoolData: schoolData,
                  studentData: studentData,
                  teacherData: teacherData,
                  mycourse: mycourse,
                  duration_study: criteria.duration_study,
                  layout: '/layout/school_layout'
                })

              });

              

            });
        });
      });  
    }); 

  },
  register_step3: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body);
    req.session.register_step = 3;
    req.session.register_isfinish = false;

    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      student_regis_data = {
        date_create: new Date(),
        student_id: criteria.id,
        date: criteria.date,
        mycourse_start: criteria.mycourse_start,
        mycourse_end: criteria.mycourse_end,
        teacher: criteria.teacher,
        sc_code: criteria.sc_code,

      }

      // db.collection('student_regis_course').findOne({
      //   student_id: ObjectId(criteria.id)
      // }, function(err, findSTDregist){
      //   if(findSTDregist)
      // })

      db.collection('student_regis_course').insert(student_regis_data, function(err, employeeData){
        if(err) return next(err);
        res.redirect('/'+ criteria.sc_code +'/student')
      })


    });  
    console.log(criteria)
  }
};
