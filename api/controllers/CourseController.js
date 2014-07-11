/**
 * CourseController
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
    
  

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to EmployeeController)
   */
  index: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
   console.log(criteria)
   MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      // db.collection('service').find( { });
      db.collection('school').findOne({ sc_code: criteria.sc_code }, function(err, schoolData){
        if(err) return next(err);

        db.collection('course').find({ sc_code: criteria.sc_code }).toArray(function(err, courseData){
         if(err) return next(err);

         console.log(courseData)
         res.view({
           title: schoolData.school_name_th,
           sc_code: criteria.sc_code,
           schoolData: schoolData,
           courseData: courseData,
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

          db.collection('course').findOne({ sc_code: criteria.sc_code }, function(err, courseData){
            if(err) return next(err);

            res.view({
              title: schoolData.school_name_th,
              sc_code: criteria.sc_code,
              schoolData: schoolData,
              layout: '/layout/school_layout'
            })

          })
      })


    })// end connect mongodb 
  },

  edit: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body); 
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {

      db.collection('course').findOne({ _id: ObjectId.createFromHexString(criteria.id) }, function(err, courseData){
        if(err) return next(err);

        res.view({
          title: "Edit course",
          data: courseData,
          layout: '/layout/layout'
        });

      })


    })// end connect mongodb 
  },


  create: function(req, res, next){
    criteria = _.merge({}, req.params.all(), req.body); 
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {

      db.collection('course').insert(criteria, function(err, courseData){
        if(err) return next(err);
        res.redirect('/'+ criteria.sc_code +'/course')
      })


    })// end connect mongodb 
  },

  destroy: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body)
    course_id = criteria.id

    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if (err) return next(err);

      db.collection('course').remove({
        _id: ObjectId.createFromHexString(course_id)
      }, function(err, deletedCourseData) {
        if (err) return next(err);

        res.redirect('/'+ criteria.sc_code +'/course')


      })

    }) // end connect mongodb 

  },

  
};
