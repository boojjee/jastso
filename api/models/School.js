/**
 * School
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    
    sc_code:{
      type: 'string'
    },
    school_name_th:{
      type: 'string'
    },
    school_name_en:{
      type: 'string'
    },
    shool_phone:{
      type: 'string'
    },
    shool_address:{
      type: 'string'
    },
    shool_zone:{
      type: 'string'
    },
    shool_email:{
      type: 'string'
    },
    shool_fax:{
      type: 'string'
    },
    shool_licence:{
      type: 'string'
    },
    shool_opening:{
      type: 'string'
    }
  }

};
