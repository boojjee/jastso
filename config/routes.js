/**
 * Routes
 *
 * Sails uses a number of different strategies to route requests.
 * Here they are top-to-bottom, in order of precedence.
 *
 * For more information on routes, check out:
 * http://sailsjs.org/#documentation
 */



/**
 * (1) Core middleware
 *
 * Middleware included with `app.use` is run first, before the router
 */


/**
 * (2) Static routes
 *
 * This object routes static URLs to handler functions--
 * In most cases, these functions are actions inside of your controllers.
 * For convenience, you can also connect routes directly to views or external URLs.
 *
 */

module.exports.routes = {

  // By default, your root route (aka home page) points to a view
  // located at `views/home/index.ejs`
  // 
  // (This would also work if you had a file at: `/views/home.ejs`)
  'get /': {
    controller: 'Home',
    action: 'index'
  },

  'get /login': {
    controller: 'Authentication',
    action: 'login'
  },

  'post /login': {
    controller: 'Authentication',
    action: 'process'
  },
  'get /logout': {
    controller: 'Authentication',
    action: 'logout'
  },

  // Schools Route
  'get /schools': {
    controller: 'School',
    action: 'index'
  },
  'get /schools/setup': {
    controller: 'School',
    action: 'setup'
  },
  'post /schools/build': {
    controller: 'School',
    action: 'build'
  },

  'get /schools/:id/edit': {
    controller: 'School',
    action: 'edit'
  },
	
  'post /schools/:id/update': {
    controller: 'School',
    action: 'update'
  },
  'get /schools/:id/destroy': {
    controller: 'School',
    action: 'destroy'
  },

  // Register Route
  'get /register/new': {
    controller: 'Register',
    action: 'new'
  },  
  'post /register/create': {
    controller: 'Register',
    action: 'create'
  },  



  // manage 
  'get /:sc_code/schools/dashboard': {
    controller: 'SchoolManage',
    action: 'dashboard'
  },
  
  // Employee
  'get /:sc_code/employee':{
    controller: 'Employee',
    action: 'index'
  },
  'get /:sc_code/employee/new':{
    controller: 'Employee',
    action: 'new'
  },
  'post /:sc_code/employee/create':{
    controller: 'Employee',
    action: 'create'
  },
  'get /:sc_code/employee/:id/edit':{
    controller: 'Employee',
    action: 'edit'
  },
  'post /employee/update':{
    controller: 'Employee',
    action: 'update'
  },
  'get /:sc_code/employee/:id/destroy': {
    controller: 'Employee',
    action: 'destroy'
  },

	
  // Course
	'get /:sc_code/course':{
		controller: 'Course',
		action: 'index'
	},
	'get /:sc_code/course/new':{
		controller: 'Course',
		action: 'new'
	},
	'post /:sc_code/course/create':{
		controller: 'Course',
		action: 'create'
	},
	'get /:sc_code/course/:id/edit':{
		controller: 'Course',
		action: 'edit'
	},
	'post /course/update':{
		controller: 'Course',
		action: 'update'
	},
  'get /:sc_code/course/:id/destroy': {
    controller: 'Course',
    action: 'destroy'
  },

  // classroom
  'get /:sc_code/classroom':{
    controller: 'Classroom',
    action: 'index'
  },
  'get /:sc_code/classroom/new':{
    controller: 'Classroom',
    action: 'new'
  },
  'post /:sc_code/classroom/create':{
    controller: 'Classroom',
    action: 'create'
  },
  'get /:sc_code/classroom/:id/edit':{
    controller: 'Classroom',
    action: 'edit'
  },
  'post /:sc_code/classroom/:id/update':{
    controller: 'Classroom',
    action: 'update'
  },
  'get /:sc_code/classroom/:id/destroy': {
    controller: 'Classroom',
    action: 'destroy'
  },


  // student
  'get /:sc_code/student':{
    controller: 'Student',
    action: 'index'
  },
  'get /:sc_code/student/new':{
    controller: 'Student',
    action: 'new'
  },
  'get /:sc_code/student/:id/finish':{
    controller: 'Student',
    action: 'finishAdd'
  },
  'get /:sc_code/student/timetable':{
    controller: 'Student',
    action: 'timetable'
  },
  'get /:sc_code/student/:id/timetable':{
    controller: 'Student',
    action: 'show_timetable'
  },
  'post /:sc_code/student/create':{
    controller: 'Student',
    action: 'create'
  },
  'get /:sc_code/student/:id/edit':{
    controller: 'Student',
    action: 'edit'
  },
  'post /student/update':{
    controller: 'Student',
    action: 'update'
  },
  'get /:sc_code/student/:id/destroy': {
    controller: 'Student',
    action: 'destroy'
  },
  // 'get /:sc_code/student/:id/show/timetable': {
  //   controller: 'Student',
  //   action: 'timetable'
  // },

  'get /:sc_code/student/register': {
    controller: 'StudentRegister',
    action: 'index'
  },
  'get /:sc_code/student/:id/register': {
    controller: 'StudentRegister',
    action: 'register'
  },
  'post /:sc_code/student/:id/register/2': {
    controller: 'StudentRegister',
    action: 'register_step2'
  },

  'post /:sc_code/student/:id/register/3': {
    controller: 'StudentRegister',
    action: 'register_step3'
  },

  // 'get /:sc_code/student/register/add': {
  //   controller: 'StudentRegister',
  //   action: 'add'
  // },



  // teacher
  'get /:sc_code/teacher':{
    controller: 'Teacher',
    action: 'index'
  },
  'get /:sc_code/teacher/time':{
    controller: 'Teacher',
    action: 'teacher_time'
  },
  'get /:sc_code/teacher/timetable':{
    controller: 'Teacher',
    action: 'timetable_index'
  },
  'get /:sc_code/teacher/:id/timetable/show':{
    controller: 'Teacher',
    action: 'timetable_show'
  },

  'get /:sc_code/teacher/:id/timetable/manage':{
    controller: 'Teacher',
    action: 'timetable_manage'
  },
  'post /:sc_code/teacher/:id/timetable/edit':{
    controller: 'Teacher',
    action: 'timetable_edit'
  },


  'get /:sc_code/teacher/new':{
    controller: 'Teacher',
    action: 'new'
  },
  'post /:sc_code/teacher/create':{
    controller: 'Teacher',
    action: 'create'
  },
  'get /:sc_code/teacher/:id/edit':{
    controller: 'Teacher',
    action: 'edit'
  },
  'post /teacher/update':{
    controller: 'Teacher',
    action: 'update'
  },
  'get /:sc_code/teacher/:id/destroy': {
    controller: 'Teacher',
    action: 'destroy'
  },


  /*
  // But what if you want your home page to display
  // a signup form located at `views/user/signup.ejs`?
  '/': {
    view: 'user/signup'
  }


  // Let's say you're building an email client, like Gmail
  // You might want your home route to serve an interface using custom logic.
  // In this scenario, you have a custom controller `MessageController`
  // with an `inbox` action.
  '/': 'MessageController.inbox'


  // Alternatively, you can use the more verbose syntax:
  '/': {
    controller: 'MessageController',
    action: 'inbox'
  }


  // If you decided to call your action `index` instead of `inbox`,
  // since the `index` action is the default, you can shortcut even further to:
  '/': 'MessageController'


  // Up until now, we haven't specified a specific HTTP method/verb
  // The routes above will apply to ALL verbs!
  // If you want to set up a route only for one in particular
  // (GET, POST, PUT, DELETE, etc.), just specify the verb before the path.
  // For example, if you have a `UserController` with a `signup` action,
  // and somewhere else, you're serving a signup form looks like: 
  //
  //		<form action="/signup">
  //			<input name="username" type="text"/>
  //			<input name="password" type="password"/>
  //			<input type="submit"/>
  //		</form>

  // You would want to define the following route to handle your form:
  'post /signup': 'UserController.signup'


  // What about the ever-popular "vanity URLs" aka URL slugs?
  // (you might remember doing this with `mod_rewrite` in Apache)
  //
  // This is where you want to set up root-relative dynamic routes like:
  // http://yourwebsite.com/twinkletoez
  //
  // NOTE:
  // You'll still want to allow requests through to the static assets,
  // so we need to set up this route to ignore URLs that have a trailing ".":
  // (e.g. your javascript, CSS, and image files)
  'get /*(^.*)': 'UserController.profile'

  */
};



/** 
 * (3) Action blueprints
 * These routes can be disabled by setting (in `config/controllers.js`):
 * `module.exports.controllers.blueprints.actions = false`
 *
 * All of your controllers ' actions are automatically bound to a route.  For example:
 *   + If you have a controller, `FooController`:
 *     + its action `bar` is accessible at `/foo/bar`
 *     + its action `index` is accessible at `/foo/index`, and also `/foo`
 */


/**
 * (4) Shortcut CRUD blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *			`module.exports.controllers.blueprints.shortcuts = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *		/foo/find/:id?	->	search lampshades using specified criteria or with id=:id
 *
 *		/foo/create		->	create a lampshade using specified values
 *
 *		/foo/update/:id	->	update the lampshade with id=:id
 *
 *		/foo/destroy/:id	->	delete lampshade with id=:id
 *
 */

/**
 * (5) REST blueprints
 *
 * These routes can be disabled by setting (in config/controllers.js)
 *		`module.exports.controllers.blueprints.rest = false`
 *
 * If you have a model, `Foo`, and a controller, `FooController`,
 * you can access CRUD operations for that model at:
 *
 *		get /foo/:id?	->	search lampshades using specified criteria or with id=:id
 *
 *		post /foo		-> create a lampshade using specified values
 *
 *		put /foo/:id	->	update the lampshade with id=:id
 *
 *		delete /foo/:id	->	delete lampshade with id=:id
 *
 */

/**
 * (6) Static assets
 *
 * Flat files in your `assets` directory- (these are sometimes referred to as 'public')
 * If you have an image file at `/assets/images/foo.jpg`, it will be made available
 * automatically via the route:  `/images/foo.jpg`
 *
 */



/**
 * (7) 404 (not found) handler
 *
 * Finally, if nothing else matched, the default 404 handler is triggered.
 * See `config/404.js` to adjust your app's 404 logic.
 */
 
