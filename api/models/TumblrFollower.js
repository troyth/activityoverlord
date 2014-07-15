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
    timestame: {
      type: 'TIME'
    }
  },

  beforeCreate: function(values, next){
    console.log('values.createdAt: ');
    console.log(values.createdAt);

    //values.timestamp = new Date(values.createdAt).getTime();
    //console.log('\n\n*******timestamp: '+ values.timestamp);

    return next();
  }


};
