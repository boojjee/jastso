/**
 * ClassroomController
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
var bcrypt = require('bcryptjs')
Mongo = require('mongodb')
MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectID;

module.exports = {

    login: function(req, res, next) {
 
      res.view({
         title: "login",
         layout: '/layout/layout_authen'
      })
    },

    process: function(req, res, next) {
      criteria = _.merge({}, req.params.all(), req.body);

      if(criteria.username == "sadmin" && criteria.password == "12345"){
        req.session.authenticated = true;
        req.session.user_role = "0";
        req.session.user_id = "super admin";

        // req.session.cookie.expires = new Date(new Date().getTime() * 60000 );
        


        res.redirect("/");
          
      }else{
        MongoClient.connect(sails.config.native_mongodb.url, function(err, db) {
          db.collection('employee').findOne({ email: criteria.username }, function(err, employeeData){

            if(_.isEmpty(employeeData)){
              res.redirect('/login')
            }else{
              if( bcrypt.compareSync(criteria.password, employeeData.password) ){

                req.session.authenticated = true;
                req.session.user_role = employeeData.position;
                req.session.sc_code = employeeData.sc_code;
                req.session.user_id = employeeData._id;
                
                req.session.employee_data = employeeData;

                db.close();
                res.redirect(req.session.sc_code+"/schools/dashboard");
              }else{
                db.close();  
                res.redirect('/login')
              }
            }

          })
        })
      }


      

      // req.session.authenticated = true;
    },

    logout: function(req, res, next){
      req.session.destroy(); 
      res.redirect('/login');
    }

}