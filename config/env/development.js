/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }

  native_mongodb  : {
	  // url: "mongodb://bj:l48F0277@kahana.mongohq.com:10049/yamaha-schools"
	  // url: "mongodb://127.0.0.1:27017/sapanhinmagazine-backend"
	  // url: "mongodb://127.0.0.1:27017/yamaha-schools"
	  url: "mongodb://yamaha-admin:AdminAdmin@128.199.152.6:27017/yamaha-school"
	  // url: "mongodb://admin:AdminAdmin@ds047440.mongolab.com:47440/yamaha-school"
	}

};
