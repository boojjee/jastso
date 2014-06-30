/**
 * SchoolController
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

school_code_gen = require('../services/school_code_gen');

module.exports = {



  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SchoolController)
   */


  index: function(req, res, next) {

    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      // db.collection('service').find( { });

      db.collection('school').find().toArray(function(err, results) {
        if (err) return next(err);

        console.log(results);

        res.view({
          title: "การจัดการโรงเรียนในเครือ",
          data: results,
          layout: '/layout/layout'
        });

      })

    }) // end connect mongodb 



  },

  edit: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if (err) return next(err);

      db.collection('school').findOne({
        _id: ObjectId.createFromHexString(criteria.id)
      }, function(err, schoolData) {
        if (err) return next(err);

        console.log(schoolData)
        res.view({
          title: "Edit School",
          data: schoolData,
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
      db.collection('school').findAndModify({
        _id: ObjectId.createFromHexString(criteria.id)
      }, [
        ['_id', 'asc']
      ], criteria, {}, function(err, object) {
        if (err) return err;
        res.redirect('/schools/');

      });

    })
  },

  setup: function(req, res, next) {

    res.view({
      title: "School Setup"
    });

  },

  build: function(req, res, next) {
    sc_code = school_code_gen.sc_code();
    criteria = _.merge({}, {
      sc_code: sc_code
    }, req.params.all(), req.body);
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      // db.collection('service').find( { });

      db.collection('school').insert(criteria, function(err, insertedSchoolData) {
        if (err) return next(err);
        console.log(insertedSchoolData);
        res.redirect('/schools');


      });

    }) // end connect mongodb 

  },

  destroy: function(req, res, next) {
    sc_code = school_code_gen.sc_code();
    criteria = _.merge({}, req.params.all(), req.body);
    school_id = criteria.id
    console.log(criteria)
    MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
      if (err) return next(err);

      db.collection('school').remove({
        _id: ObjectId.createFromHexString(school_id)
      }, function(err, insertedSchoolData) {
        if (err) return next(err);

        res.redirect('/schools')


      })

    }) // end connect mongodb 

  },

  manage: function(req, res, next) {
    criteria = _.merge({}, req.params.all(), req.body);
    console.log(criteria)
  }

};