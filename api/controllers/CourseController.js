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
Mongo = require('mongodb');
MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectID;
Moment = require('moment');

module.exports = {



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to EmployeeController)
   */
  index: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
        // db.collection('service').find( { });
        db.collection('school').findOne({
          sc_code: my_sc_code
        }, function(err, schoolData) {
          if (err) {
            console.log(err)
          }

          db.collection('course').find({
            sc_code: my_sc_code
          }).toArray(function(err, courseData) {
            if (err) {
              console.log(err)
            }

            db.close();
            console.log(courseData);
            console.log(schoolData);
            console.log(my_sc_code);
            res.view({
              title: schoolData.school_name_th,
              sc_code: my_sc_code,
              schoolData: schoolData,
              courseData: courseData,
              layout: '/layout/school_layout'
            })
          })

        })


      }) // end connect mongodb 
  },

  new: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
        // db.collection('service').find( { });

        db.collection('school').findOne({
          sc_code: my_sc_code
        }, function(err, schoolData) {
          if (err) {
            console.log(err)
          }

          db.collection('course').findOne({
            sc_code: my_sc_code
          }, function(err, courseData) {
            if (err) {
              console.log(err)
            }

            db.collection('classroom').find({
              sc_code: my_sc_code
            }).toArray(function(err, classroomData) {
              if (err) {
                console.log(err)
              }

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
        })


      }) // end connect mongodb 
  },

  edit: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;
    // console.log(criteria);

    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
        db.collection('school').findOne({
          sc_code: my_sc_code
        }, function(err, schoolData) {
          if (err) {
            console.log(err)
          }


          db.collection('course').findOne({
            _id: ObjectId.createFromHexString(criteria.id)
          }, function(err, courseData) {
            if (err) {
              console.log(err)
            }

            db.collection('classroom').find({
              sc_code: my_sc_code
            }).toArray(function(err, classroomData) {
              if (err) {
                console.log(err)
              }

              db.close();
              res.view({
                title: "Edit course",
                data: courseData,
                sc_code: courseData.sc_code,
                schoolData: schoolData,
                classroomData: classroomData,
                layout: '/layout/school_layout'
              });
            })
          })

        })


      }) // end connect mongodb 
  },


  create: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
        // console.log(criteria)
        var transform_data = [];
        if (_.isArray(criteria.course_title)) {
          for (var i = 0; i < criteria.course_title.length; i++) {
            transform_data.push({
              course_title: criteria.course_title[i],
              course_price: criteria.course_price[i],
              course_bookstep: criteria.course_bookstep[i]
            })
          }
        } else {
          transform_data.push({
            course_title: criteria.course_title,
            course_price: criteria.course_price,
            course_bookstep: criteria.course_bookstep
          });
        }

        course_data = {
          syllabus: criteria.syllabus,
          is_yamaha_course: criteria.is_yamaha_course,
          discription: criteria.discription,
          course_age: criteria.course_age,
          course_term: criteria.course_term,
          book_step: transform_data,
          no_of_student: criteria.no_of_student,
          groups: criteria.groups,
          cost: criteria.cost,
          classroom: ObjectId(criteria.classroom),
          sc_code: my_sc_code,
        }

        // console.log(course_data);

        db.collection('course').insert(course_data, function(err, courseData) {
          if (err) {
            console.log(err)
          }
          db.close();
          res.redirect('/' + my_sc_code + '/course')
        })


      }) // end connect mongodb 
  },

  update: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
        // console.log(criteria)

        var transform_data = [];
        if (_.isArray(criteria.course_title)) {
          for (var i = 0; i < criteria.course_title.length; i++) {
            transform_data.push({
              course_title: criteria.course_title[i],
              course_price: criteria.course_price[i],
              course_bookstep: criteria.course_bookstep[i]
            })
          }
        } else {
          transform_data.push({
            course_title: criteria.course_title,
            course_price: criteria.course_price,
            course_bookstep: criteria.course_bookstep
          });
        }

        course_data = {
          syllabus: criteria.syllabus,
          is_yamaha_course: criteria.is_yamaha_course,
          discription: criteria.discription,
          course_age: criteria.course_age,
          course_term: criteria.course_term,
          book_step: transform_data,
          no_of_student: criteria.no_of_student,
          groups: criteria.groups,
          cost: criteria.cost,
          sc_code: my_sc_code,
          classroom: ObjectId(criteria.classroom),
        }

        // console.log(course_data);

        db.collection('course').update({
          _id: ObjectId.createFromHexString(criteria.course_id)
        }, {
          $set: course_data
        }, function(err, courseData) {
          if (err) {
            console.log(err)
          }

          db.close();
          res.redirect('/' + my_sc_code + '/course')
        })


      }) // end connect mongodb 
  },

  destroy: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body)
    course_id = criteria.id
    my_sc_code = req.session.sc_code;

    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
        if (err) {
          console.log(err)
        }

        db.collection('course').remove({
          _id: ObjectId.createFromHexString(course_id)
        }, function(err, deletedCourseData) {
          if (err) {
            console.log(err)
          }

          db.close();
          res.redirect('/' + my_sc_code + '/course')


        })

      }) // end connect mongodb 

  },


};