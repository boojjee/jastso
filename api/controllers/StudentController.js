/**
 * StudentController
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
    
  

  index: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      // db.collection('service').find( { });
      db.collection('school').findOne({ sc_code: my_sc_code }, function(err, schoolData){
        if (err) { console.log(err)}

        db.collection('student').find({ sc_code: my_sc_code }).toArray(function(err, studentData){
          if (err) { console.log(err)}
          console.log();
          db.close(studentData);
          res.view({
            title: schoolData.school_name_th,
            sc_code: my_sc_code,
            schoolData: schoolData,
            studentData: studentData,
            layout: '/layout/school_layout'
          })

        })

        
      })
    })

    
  },

  new: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body); 
    my_sc_code = req.session.sc_code;
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      // db.collection('service').find( { });

      db.collection('school').findOne({ sc_code: my_sc_code }, function(err, schoolData){
        if (err) { console.log(err)}
          
        db.close();
        res.view({
          title: schoolData.school_name_th,
          sc_code: my_sc_code,
          schoolData: schoolData,
          layout: '/layout/school_layout'
        })
      })


    })// end connect mongodb 
  },

  create: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body); 
    my_sc_code = req.session.sc_code;
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {

      db.collection('student').insert(criteria, function(err, employeeData){
        if (err) { console.log(err)}
        
        student_id = employeeData[0]._id;
        db.close();

        res.redirect("/" + my_sc_code + "/student/" + student_id + "/finish")
 
      })


    })// end connect mongodb 
  },

  finishAdd: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body); 
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if (err) { console.log(err)}
      db.collection('school').findOne({ sc_code: my_sc_code }, function(err, schoolData){
        if (err) { console.log(err) }

        db.collection('student').findOne({
          _id: ObjectId(criteria.id)
        }, function(err, studentData) {
          if (err) { console.log(err) }


          res.view({
            title: schoolData.school_name_th,
            sc_code: my_sc_code,
            schoolData: schoolData,
            data: studentData,
            layout: '/layout/school_layout'
          });  

        });

     });
    });
 
  },

  edit: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if (err) { console.log(err)}
      db.collection('school').findOne({ sc_code: my_sc_code }, function(err, schoolData){
        if (err) { console.log(err)}

        db.collection('student').findOne({
          _id: ObjectId.createFromHexString(criteria.id)
        }, function(err, studentData) {
          if (err) { console.log(err)}
          
          db.close();
          res.view({
            title: schoolData.school_name_th,
            sc_code: my_sc_code,
            schoolData: schoolData,
            data: studentData,
            layout: '/layout/school_layout'
          });

        });

      });
    });
  },

  update: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if (err) { console.log(err)}
      
      db.collection('student').findAndModify({
        _id: ObjectId(criteria.id)
      }, [
        ['_id', 'asc']
      ], criteria, {}, function(err, object) {
        if (err) { console.log(err)}
        
        db.close();
        res.redirect('/student');

      });

    })
  },

  destroy: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;
    school_id = criteria.id
    console.log(criteria)
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if (err) { console.log(err)}

      db.collection('student').remove({
        _id: ObjectId.createFromHexString(school_id)
      }, function(err, insertedTeacherData) {
        if (err) { console.log(err)}
        
        db.close();
        res.redirect('/student')


      })

    }) // end connect mongodb 

  },

  timetable: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;
    std_id : criteria.id;
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      // db.collection('service').find( { });
      db.collection('school').findOne({ sc_code: my_sc_code }, function(err, schoolData){
        if (err) { console.log(err)}

        db.collection('student').find({ sc_code: my_sc_code }).toArray(function(err, studentData){
          if (err) { console.log(err)}
          
          db.close();
          res.view({
            title: schoolData.school_name_th,
            sc_code: my_sc_code,
            schoolData: schoolData,
            studentData: studentData,
            layout: '/layout/school_layout'
          })

        })

        
      })
    })
  },

  show_timetable: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
 
    my_sc_code = req.session.sc_code;
    std_id = criteria.id;

    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      // db.collection('service').find( { });
      db.collection('school').findOne({ sc_code: my_sc_code }, function(err, schoolData){
        if (err) { console.log(err)}

        db.collection('student').findOne({ _id: ObjectId(std_id) }, function(err, studentData){
          if (err) { console.log(err)}
          
          

          db.collection('student_regis_course').find({ student_id: ObjectId(std_id) }).toArray(function(err, studentRegistCostData){
            if (err) { console.log(err)}
            
            console.log(studentData)
            db.close();
            res.view({
              title: schoolData.school_name_th,
              sc_code: my_sc_code,
              schoolData: schoolData,
              studentData: studentData,
              moment : Moment,
              studentRegistCostData: studentRegistCostData,
              layout: '/layout/school_layout'
            })

          })

          

        })

        
      })
    })
  }




};
