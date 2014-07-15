/**
 * TumblrFollower
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,

  attributes: {

  	name: {
      type: 'STRING',
      required: true
    },
    url: {
      type: 'STRING',
      required: true
    },
    updated: {
      type: 'STRING'
    },
    following: {
      type: 'BOOLEAN'
    },

    beforeUpdate: function(values, cb){
      if(values.createdAt && typeof value.createdAt === 'string'){
          values.createdAt = new Date(Date.parse(values.createdAt));
      }
      return cb();
    }

  }

};
