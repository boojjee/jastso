/**
 * Course
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
  	name:{
      type: 'string'
    },
    description:{
      type: 'string'
    },
    book_step:{
      type: 'string'
    },
    groups:{
      type: 'string'
    },
    syllabus:{
      type: 'string'
    },
    is_extend:{
      type: 'string'
    },
    cost:{
      type: 'string'
    },
    
  }

};
