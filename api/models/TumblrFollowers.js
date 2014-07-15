/**
 * Followers
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,

  attributes: {

    username: {
      type: 'string',
      required: true
    },

    url: {
      type: 'string'
    },

    followedAt: {
      type: 'date',
      required: true
    },

    likes: {
      type: 'number'
    },

    reblogs: {
      type: 'number'
    },

    following: {
      type: 'boolean',
      required: true
    }


  }

};
