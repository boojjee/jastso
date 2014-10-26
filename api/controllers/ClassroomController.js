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

module.exports = {

  index: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      // db.collection('service').find( { });
      db.collection('school').findOne({ sc_code: criteria.sc_code }, function(err, schoolData){
        if(err) return next(err);

        db.collection('classroom').find({ sc_code: criteria.sc_code }).toArray(function(err, classroomData){
         if(err) return next(err);
         
         res.view({
           title: schoolData.school_name_th,
           sc_code: criteria.sc_code,
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
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      // db.collection('service').find( { });

      db.collection('school').findOne({ sc_code: criteria.sc_code }, function(err, schoolData){
        if(err) return next(err);


        res.view({
          title: schoolData.school_name_th,
          sc_code: criteria.sc_code,
          schoolData: schoolData,
          layout: '/layout/school_layout'
        })


      })


    })// end connect mongodb 
  },

  edit: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body); 
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      db.collection('school').findOne({ sc_code: criteria.sc_code }, function(err, schoolData){
        if(err) return next(err);
        db.collection('classroom').findOne({ _id: ObjectId.createFromHexString(criteria.id) }, function(err, classroomData){
          if(err) return next(err);

          console.log(classroomData)
          res.view({
            title: "Edit classroom",
            sc_code: criteria.sc_code,
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
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if(err)console.log(err);
      console.log(criteria);

      room_data = {
        name : criteria.name,
        description : criteria.description,
        room_equipment : criteria.room_equipment,
        sc_code : criteria.sc_code
      }


      db.collection('classroom').update( 
          { _id :ObjectId.createFromHexString(criteria.classroom_id) }
        , { $set: room_data }
        , function(err, resultUpdate){
        if(err) return next(err);
        res.redirect('/'+ criteria.sc_code +'/classroom')
      })

    })
  },

  create: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body); 
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {

      db.collection('classroom').insert(criteria, function(err, classroomData){
        if(err) return next(err);
        res.redirect('/'+ criteria.sc_code +'/classroom')
      })


    })// end connect mongodb 
  },

  destroy: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body)
    classroom_id = criteria.id

    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if (err) return next(err);

      db.collection('classroom').remove({
        _id: ObjectId.createFromHexString(classroom_id)
      }, function(err, deletedClassroomData) {
        if (err) return next(err);

        res.redirect('/'+ criteria.sc_code +'/classroom')


      })

    }) // end connect mongodb 

  },

  
};
