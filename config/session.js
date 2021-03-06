/**
 * Session
 * 
 * Sails session integration leans heavily on the great work already done by Express, but also unifies 
 * Socket.io with the Connect session store. It uses Connect's cookie parser to normalize configuration
 * differences between Express and Socket.io and hooks into Sails' middleware interpreter to allow you
 * to access and auto-save to `req.session` with Socket.io the same way you would with Express.
 *
 * For more information on configuring the session, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.session = {

  // Session secret is automatically generated when your new app is created
  // Replace at your own risk in production-- you will invalidate the cookies of your users,
  // forcing them to log in again. 
  secret: 'da7a96c48dc46319d5238f582096538e',


  // In production, uncomment the following lines to set up a shared redis session store
  // that can be shared across multiple Sails.js servers

  //
  // The following values are optional, if no options are set a redis instance running
  // on localhost is expected.
  // Read more about options at: https://github.com/visionmedia/connect-redis
  
  adapter: 'redis',
  host: '127.0.0.1',
  port: 6379,
  ttl: 3600,
  db: 2,
  prefix: 'sess:',
  cookie: {
    maxAge: 60 * 60 * 1000  // example: 60 mins in miliseconds
  }
  // pass: <redis auth password>

  // Uncomment the following lines to use your Mongo adapter as a session store
  // adapter: 'mongo',
  
  // host: '128.199.152.6',
  // port: 27017,
  // db: 'yamaha-school-production',
  // collection: 'sessions',
  // username: 'yamaha-admin',
  // password: 'AdminAdmin',  
  // cookie: {
  //   maxAge: 60 * 60 * 1000  // example: 60 mins in miliseconds
  // }

  // adapter: 'mongo',
  // host: 'ds047440.mongolab.com',
  // port: 47440,
  // db: 'yamaha-school',
  // collection: 'sessions',
  // username: 'admin',
  // password: 'AdminAdmin',

  //
  // Optional Values:
  //
  // # Note: url will override other connection settings
  // url: 'mongodb://user:pass@host:port/database/collection',
  //
  // username: '',
  // password: '',
  // auto_reconnect: false,
  // ssl: false,
  // stringify: true

};
