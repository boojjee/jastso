/**
 * HomeController
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
ObjectID = require('mongodb').ObjectID;


module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to HomeController)
   */
  index: function(req, res, next) {
    if(req.session.user_role == "0" || req.session.user_role == "1"){
      res.view({
        title: "Welcome to School System",
        layout: '/layout/layout_home'
      })
    }else{
      res.redirect(req.session.sc_code+"/schools/dashboard");
    } 
    
  }

  
};
