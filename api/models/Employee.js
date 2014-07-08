/**
 * Employee
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
    sc_code:{
      type: 'string'
    },
    ey_code:{
      type: 'string'
    },
		title_name: {
			type: 'string'
		},
  	first_name:{
      type: 'string'
    },
  	last_name:{
      type: 'string'
    },
  	position:{
      type: 'string'
    },
  	phone:{
      type: 'string'
    },
  	email:{
      type: 'string'
    }
  }

};
