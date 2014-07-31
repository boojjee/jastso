/**
 * TeacherController
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
        db.collection('teacher').find({ sc_code: criteria.sc_code }, function(err, teacherData){
          if(err) return next(err);

          res.view({
            title: schoolData.school_name_th,
            sc_code: criteria.sc_code,
            schoolData: schoolData,
            teacherData: teacherData,
            layout: '/layout/school_layout'
          })

        })

      })
    })

    
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

  edit: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if (err) return next(err);

      db.collection('teacher').findOne({
        _id: ObjectId.createFromHexString(criteria.id)
      }, function(err, teacherData) {
        if (err) return next(err);

        res.view({
          title: "Edit Teacher",
          data: teacherData,
          layout: '/layout/layout'
        });

      });

    });
  },

  update: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if(err)console.log(err);
      console.log(criteria);
      db.collection('teacher').findAndModify({
        _id: ObjectId.createFromHexString(criteria.id)
      }, [
        ['_id', 'asc']
      ], criteria, {}, function(err, object) {
        if (err) return err;
        res.redirect('/teacher');

      });

    })
  },

  build: function(req, res, next) {
    sc_code = code_gen.sc_code();
    criteria = _.merge({}, {
      sc_code: sc_code
    }, req.params.all(), req.body);
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      // db.collection('service').find( { });

      db.collection('teacher').insert(criteria, function(err, insertedTeacherData) {
        if (err) return next(err);
        console.log(insertedTeacherData);
        res.redirect('/teacher');


      });

    }) // end connect mongodb 

  },

  destroy: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    school_id = criteria.id
    console.log(criteria)
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if (err) return next(err);

      db.collection('teacher').remove({
        _id: ObjectId.createFromHexString(school_id)
      }, function(err, insertedTeacherData) {
        if (err) return next(err);

        res.redirect('/teacher')


      })

    }) // end connect mongodb 

  },

  manage: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    console.log(criteria)
  }




  
};
