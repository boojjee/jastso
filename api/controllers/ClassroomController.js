/**
 * ClassroomController
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
var uuid = require('uuid');

MongoClient = require('mongodb').MongoClient;
ObjectID = require('mongodb').ObjectID;

module.exports = {

  index: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    
    my_sc_code = req.session.sc_code;
    
    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      // db.collection('service').find( { });
      db.collection('school').findOne({ sc_code: my_sc_code }, function(err, schoolData){
        if(err){ console.log(err); }

        db.collection('classroom').find({ sc_code: my_sc_code }).toArray(function(err, classroomData){
         if(err){ console.log(err); }
         
         db.close();                    
         res.view({
           title: schoolData.school_name_th,
           sc_code: my_sc_code,
           schoolData: schoolData,
           classroomData: classroomData,
           layout: '/layout/school_layout'
         })
       })

      })


    })// end connect mongodb 
  },

  new: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code; 
    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      
      db.collection('school').findOne({ sc_code: my_sc_code }, function(err, schoolData){
        if(err) { console.log(err) }

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

  edit: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body); 
    my_sc_code = req.session.sc_code;
    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      db.collection('school').findOne({ sc_code: my_sc_code }, function(err, schoolData){
        if(err) { console.log(err) }
        db.collection('classroom').findOne({ _id: ObjectID.createFromHexString(criteria.id) }, function(err, classroomData){
          if(err) { console.log(err) }

          db.close();
          res.view({
            title: "Edit classroom",
            sc_code: my_sc_code,
            schoolData: schoolData,
            classroomData: classroomData,
            layout: '/layout/school_layout'
          });

        })
      })


    })// end connect mongodb 
  },

  update: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;
    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      if(err_con) console.log(err_con);
      
      req.file('room_plan').upload( { 

        dirname: sails.config.appPath +"/assets/uploads/classroom", 
        saveAs:  function(file, cb){ 
          cb(null, file.filename);
        }

      }, function (err, files) {
        if (err) console.log(err);

        console.log(files)

        room_data = {
          name : criteria.name,
          description : criteria.description,
          room_equipment : criteria.room_equipment,
          sc_code : my_sc_code,
          room_plan: files
        }

        console.log(criteria)              
        console.log(criteria.classroom_id)              
        console.log(ObjectID.createFromHexString(criteria.classroom_id) )
        console.log(ObjectID(criteria.classroom_id) )

        db.collection('classroom').update( 
            { "_id" : ObjectID.createFromHexString(criteria.classroom_id) }
          , { $set: room_data }
          , function(err, resultUpdate){

          if(err) { console.log(err) }
          
          // console.log(room_data)              
          
          db.close();    
          res.redirect('/'+ my_sc_code +'/classroom')
        })

      });

    })
  },

  create: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body); 
    my_sc_code = req.session.sc_code;
    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      
      req.file('room_plan').upload( { 
        dirname: sails.config.appPath +"/assets/uploads/classroom", 
        saveAs:  function(file, cb){ 
          cb(null, file.filename);
        }
      }, function (err, files) {
        if (err) console.log(err);

        room_data = _.merge({}, criteria, { room_plan: files })
        db.collection('classroom').insert(room_data, function(err, classroomData){
          if(err) { console.log(err) }
          
          db.close();
          res.redirect('/'+ my_sc_code +'/classroom')
        })

      });

    })// end connect mongodb 
  },

  destroy: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body)
    my_sc_code = req.session.sc_code;
    classroom_id = criteria.id

    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      if (err_con) return next(err_con);

      db.collection('classroom').remove({
        "_id": ObjectID.createFromHexString(classroom_id)
      }, function(err, deletedClassroomData) {
        if (err) return next(err);
          
        db.close();  
        res.redirect('/'+ my_sc_code +'/classroom')

      })

    }) // end connect mongodb 

  },

  
};
