/**
 * EmployeeController
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
 bcrypt = require('bcryptjs')

 code_gen = require('../services/code_gen');

 module.exports = {



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to EmployeeController)
   */
   index: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    // console.log("DDDD")
    // console.log(req.session)
    my_sc_code = req.session.sc_code;
    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      // db.collection('service').find( { });
      db.collection('school').findOne({ sc_code: my_sc_code }, function(err, schoolData){
        if(err) { console.log(err)}

        db.collection('employee').find({ sc_code: my_sc_code }).toArray(function(err, employeeData){
         if(err) { console.log(err)}

         db.close();
         res.view({
           title: schoolData.school_name_th,
           sc_code: my_sc_code,
           schoolData: schoolData,
           employeeData: employeeData,
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
      // db.collection('service').find( { });
      db.collection('school').findOne({ sc_code: my_sc_code }, function(err, schoolData){
        if(err) { console.log(err)}
        
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
        if(err) { console.log(err)}
        db.collection('employee').findOne({ _id: ObjectID.createFromHexString(criteria.id) }, function(err, employeeData){
          if(err) { console.log(err)}
          
          db.close();
          res.view({
            title: "Edit School",
            sc_code: my_sc_code,
            data: schoolData,
            schoolData: schoolData,
            employeeData: employeeData,
            layout: '/layout/school_layout'
          });

        })
      })


    })// end connect mongodb 
  },


  create: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body); 
    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      var employee_data = {
        first_name: criteria.first_name,
        last_name: criteria.last_name,
        thai_id_number: criteria.thai_id_number,
        nick_name: criteria.nick_name,
        position: criteria.position,
        line_id: criteria.line_id,
        phone: criteria.phone,
        address: criteria.address,
        email: criteria.email,
        password: bcrypt.hashSync(criteria.password),
        sc_code: my_sc_code
      }
      db.collection('employee').insert(employee_data, function(err, employeeData){
        if(err) { console.log(err)}
        
        db.close();
        res.redirect('/'+ my_sc_code +'/employee')
      })


    })// end connect mongodb 
  },

  update: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body);	
    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      var employee_data = {
        first_name: criteria.first_name,
        last_name: criteria.last_name,
        thai_id_number: criteria.thai_id_number,
        position: criteria.position,
        line_id: criteria.line_id,
        phone: criteria.phone,
        address: criteria.address,  
      }
  
      db.collection('employee').update( 
          { _id : ObjectID.createFromHexString(criteria.classroom_id) }
        , { $set: employee_data }
        , function(err, resultUpdate){
        if(err) { console.log(err) }
            
        db.close();    
        res.redirect('/'+ my_sc_code +'/employee')
      })



    })// end connect mongodb 
  },

  destroy: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body)
    employee_id = criteria.id
    my_sc_code = req.session.sc_code;

    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      if (err_con) return next(err_con);

      db.collection('employee').remove({
        _id: ObjectID.createFromHexString(employee_id)
      }, function(err, deletedSchoolData) {
        if (err) return next(err);
        
        db.close();
        res.redirect('/'+ my_sc_code +'/employee')


      })

    }) // end connect mongodb 

  },

  
};
