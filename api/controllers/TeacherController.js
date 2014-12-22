/**
 * TeacherController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
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

    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      // db.collection('service').find( { });

      db.collection('school').findOne({
        sc_code: my_sc_code
      }, function(err, schoolData) {
          if (err) {
            console.log(err)
          }
          ;

          db.collection('teacher').find({
            sc_code: my_sc_code
          }).toArray(function(err, teacherData) {
            if (err) {
              console.log(err)
            }
            
            db.collection('course').find({
              sc_code: my_sc_code
              }).toArray(function(err, courseData) {

            db.close();

            res.view({
              title: schoolData.school_name_th,
              sc_code: my_sc_code,
              schoolData: schoolData,
              teacherData: teacherData,
              courseData: courseData,
              layout: '/layout/school_layout'
            })



            })
          })

        })
    })


  },

  timetable_index: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;

    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      // db.collection('service').find( { });

      db.collection('school').findOne({
        sc_code: my_sc_code
      }, function(err, schoolData) {
          if (err) {
            console.log(err)
          }
          ;

          db.collection('teacher').find({
            sc_code: my_sc_code
          }).toArray(function(err, teacherData) {
            if (err) {
              console.log(err)
            }
            ;


            db.close();
            res.view({
              title: schoolData.school_name_th,
              sc_code: my_sc_code,
              schoolData: schoolData,
              teacherData: teacherData,
              layout: '/layout/school_layout'
            })



          })

        })
    })


  },

  timetable_show: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;

    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      // db.collection('service').find( { });

      db.collection('school').findOne({
        sc_code: my_sc_code
      }, function(err, schoolData) {
          if (err) {
            console.log(err)
          }
          ;

          db.collection('teacher').find({
            sc_code: my_sc_code
          }).toArray(function(err, teacherData) {
            if (err) {
              console.log(err)
            }
            ;


            db.close();
            res.view({
              title: schoolData.school_name_th,
              sc_code: my_sc_code,
              schoolData: schoolData,
              teacherData: teacherData,
              layout: '/layout/school_layout'
            })



          })

        })
    })


  },

  timetable_manage: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;

    teacher_id = criteria.id
    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      // db.collection('service').find( { });

      db.collection('school').findOne({
        sc_code: my_sc_code
      }, function(err, schoolData) {
          if (err) {
            console.log(err)
          }
          ;

          db.collection('teacher').findOne({
            sc_code: my_sc_code,
            _id: ObjectId.createFromHexString(teacher_id)
          }, function(err, teacherData) {
              if (err) {
                console.log(err)
              }
              ;

              db.collection('course').find({
                sc_code: my_sc_code
              }).toArray(function(err, courseData) {
                if (err) {
                  console.log(err)
                }
                ;

                course_merge_teacher = [];
                // console.log(teacherData)
                if (_.isArray(teacherData.course)) {
                  _.each(courseData, function(course_loop_data) {
                    _.each(teacherData.course, function(cc_data) {
                      if (cc_data == course_loop_data._id) {
                        course_merge_teacher.push(course_loop_data)
                      }
                    })
                  })

                } else {
                  _.each(courseData, function(course_loop_data) {
                    if (teacherData.course == course_loop_data._id) {
                      course_merge_teacher.push(course_loop_data)
                    }
                  })
                }


                db.collection('teacher_timetable').find(
                  {
                    sc_code: my_sc_code,
                    teacher_id: ObjectId(teacher_id)
                  })
                  .toArray(function(err, teacher_timetable) {

                    if (err) {
                      console.log(err)
                    }
                    ;
                    
                    db.close();
                    res.view({
                      title: schoolData.school_name_th,
                      sc_code: my_sc_code,
                      schoolData: schoolData,
                      teacherData: teacherData,
                      teacher_timetable: teacher_timetable,
                      my_course: course_merge_teacher,
                      courseData: courseData,
                      layout: '/layout/school_layout'
                    })

                  })





              })
            })

        })
    })


  },
  timetable_show: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;

    teacher_id = criteria.id;

    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      // db.collection('service').find( { });

      db.collection('school').findOne({
        sc_code: my_sc_code
      }, function(err, schoolData) {
          if (err) {
            console.log(err)
          }
          ;

          db.collection('teacher').findOne({
            sc_code: my_sc_code,
            _id: ObjectId.createFromHexString(teacher_id)
          }, function(err, teacherData) {
              if (err) {
                console.log(err)
              }
              ;

              db.collection('course').find({
                sc_code: my_sc_code
              }).toArray(function(err, courseData) {
                if (err) {
                  console.log(err)
                }
                ;

                course_merge_teacher = [];
                // console.log(teacherData)
                if (_.isArray(teacherData.course)) {
                  _.each(courseData, function(course_loop_data) {
                    _.each(teacherData.course, function(cc_data) {
                      if (cc_data == course_loop_data._id) {
                        course_merge_teacher.push(course_loop_data)
                      }
                    })
                  })

                } else {
                  _.each(courseData, function(course_loop_data) {
                    if (teacherData.course == course_loop_data._id) {
                      course_merge_teacher.push(course_loop_data)
                    }
                  })
                }


                db.collection('teacher_timetable').findOne(
                  {
                    sc_code: my_sc_code,
                    teacher_id: ObjectId(teacher_id)
                  }, function(err, teacher_timetable) {

                    console.log(teacher_timetable)
                    if (err) {
                      console.log(err)
                    }
                    ;
                    
                    db.close();
                    res.view({
                      title: schoolData.school_name_th,
                      sc_code: my_sc_code,
                      schoolData: schoolData,
                      teacherData: teacherData,
                      teacher_timetable: teacher_timetable,
                      my_course: course_merge_teacher,
                      courseData: courseData,
                      layout: '/layout/school_layout'
                    })

                  })





              })
            })

        })
    })


  },

  timetable_edit: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;

    console.log("___________######____________")
    // console.log(criteria)
    var dd = [];
    _.each(criteria.mycourse, function(mycourse) {
      dd.push(mycourse)
    })

    // console.log(_.isUndefined(dd.day))

    teacher_id = criteria.id;
    tmp = [];
    tmp_time_data = []; 
    
    _.each(dd, function(data) {
      var tmp_day = [];
      var tmp_times = [];
      console.log(_.isUndefined(data.day))
      if (_.isUndefined(data.day)) {
        tmp_time_data = []
      } else {
        for (var i = 0; i < data.day.length; i++) {
          tmp_time_data.push({
            day: data.day[i],
            times: data.time_start[i] + "-" + data.time_end[i]
          })
        }
        ;
      }

      tmp.push({
        course_id: ObjectId(data.course_id),
        time: tmp_time_data
      })
      tmp_time_data = [];
    })

    timetable_data = {
      teacher_id: ObjectId(teacher_id),
      sc_code: my_sc_code,
      time_data: tmp
    }


    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      db.collection('teacher_timetable').find({
        teacher_id: ObjectId(teacher_id)
      }).toArray(function(err, courseData) {
        if (err) {
          console.log(err)
        } 

        if (_.isEmpty(courseData)) {
          console.log("insert");
          db.collection('teacher_timetable').insert(timetable_data, function(err, insertedtimetable_data) {
            // res.json(insertedtimetable_data)
            db.close();
            res.redirect('/' + my_sc_code + '/teacher')
          })
        } else {
          console.log("update");
 
          db.collection('teacher_timetable').update({
            teacher_id: ObjectId.createFromHexString(teacher_id)
          },
            {
              $set: {
                time_data: tmp
              }
            }, function(err, resultUpdate) {
              if (err) {
                console.log(err)
              }
              ;
              
              db.close();
              res.redirect('/' + my_sc_code + '/teacher')
            })
        }
        // _.each(courseData, function(cdate){



        // });

      });
    });


  },
  new: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;

    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      // db.collection('service').find( { });
      db.collection('school').findOne({
        sc_code: my_sc_code
      }, function(err, schoolData) {
          if (err) {
            console.log(err)
          }
          ;

          db.collection('course').find({
            sc_code: my_sc_code
          }).toArray(function(err, courseData) {
            if (err) {
              console.log(err)
            } 
            
            db.close();
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

  edit: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;

    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      if (err) {
        console.log(err)
      }
      ;

      db.collection('teacher').findOne({
        _id: ObjectId.createFromHexString(criteria.id)
      }, function(err, teacherData) {
          if (err) {
            console.log(err)
          }
          ;
          db.collection('school').findOne({
            sc_code: my_sc_code
          }, function(err, schoolData) {
              db.collection('course').find({
                sc_code: my_sc_code
               }).toArray(function(err, courseData) {
                if (err) {
                  console.log(err)
                }
                ;
                
                db.close();
                res.view({
                  title: "Edit Teacher",
                  courseData: courseData,
                  schoolData: schoolData,
                  sc_code: my_sc_code,
                  data: teacherData,
                  layout: '/layout/school_layout'
                });

              });
            });
        });

    });
  },

  update: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;

    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      if (err) console.log(err);
      teacher_id = criteria.teacher_id;
      teacher_course = []
      if (_.isArray(criteria.teacher_course)) {
        teacher_course = criteria.teacher_course
      } else {
        if (_.isEmpty(criteria.teacher_course)) {
          teacher_course = []
        } else {
          teacher_course.push(criteria.teacher_course)
        }
      }


      teacher_data = {
        sc_code: my_sc_code,
        first_name_th: criteria.first_name_th,
        last_name_th: criteria.last_name_th,
        first_name_en: criteria.first_name_en,
        last_name_en: criteria.last_name_en,
        nickname: criteria.nickname,
        position: criteria.position,
        phone: criteria.phone,
        address: criteria.address,
        course: teacher_course,
        email: criteria.email,
        password: criteria.password,
      }

      db.collection('teacher').update({
        _id: ObjectId.createFromHexString(teacher_id)
      },
        {
          $set: teacher_data
        }, function(err, resultUpdate) {
          if (err) {
            console.log(err)
          } 
        
          db.close();
          res.redirect('/' + my_sc_code + '/teacher')
        })


    })
  },

  create: function(req, res, next) {

    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;

    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      // db.collection('service').find( { });
      var teacher_course = [];
      if (criteria.teacher_course) {
        if (criteria.teacher_course.length == 1) {
          teacher_course.push(criteria.teacher_course)
        } else {
          teacher_course.push(criteria.teacher_course)
        }
      } else {
        teacher_course = null
      }
      teacher_data = {
        sc_code: my_sc_code,
        first_name_th: criteria.first_name_th,
        last_name_th: criteria.last_name_th,
        first_name_en: criteria.first_name_en,
        last_name_en: criteria.last_name_en,
        nickname: criteria.nickname,
        position: criteria.position,
        phone: criteria.phone,
        address: criteria.address,
        course: teacher_course,
        email: criteria.email
      }

      console.log(teacher_data)
      db.collection('school').findOne({
        sc_code: my_sc_code
      }, function(err, schoolData) {
          if (err) {
            console.log(err)
          }
          ;

          db.collection('teacher').insert(teacher_data, function(err, insertedTeacherData) {
            if (err) {
              console.log(err)
            }
            
            db.close();

            res.redirect('/' + my_sc_code + '/teacher');


          });
        });

    }) // end connect mongodb 

  },

  destroy: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;

    teacher_id = criteria.id
    console.log(criteria)
    MongoClient.connect(sails.config.native_mongodb.url, function(err_con, db) {
      if (err) {
        console.log(err)
      }
      ;

      db.collection('teacher').remove({
        _id: ObjectId.createFromHexString(teacher_id)
      }, function(err, resultRemove) {
          if (err) {
            console.log(err)
          }
          ;
          db.close();
          res.redirect('/' + my_sc_code + '/teacher');


        })

    }) // end connect mongodb 

  },

  manage: function(req, res, next) {

    criteria = _.merge({}, req.params.all(), req.body);
    my_sc_code = req.session.sc_code;

    console.log(criteria)
  }





};