/**
 * TumblrController
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


var tumblr = require('tumblr.js'),
    passport = require('passport'),
    util = require('util'),
    TumblrStrategy = require('passport-tumblr').Strategy;


var client;

var TUMBLR_CONSUMER_KEY = 'AlGQ1aWiD6D2M5alqTbeM5Et7wQR0e9OvixCtAT9YpDqKCK3bI',
    TUMBLR_CONSUMER_SECRET = 'AfRbdjWLOzcghJJr7u4YFjYTIMT9hPwq9Eb8n4BqwOim5UtV29';


passport.use(new TumblrStrategy({
  consumerKey: TUMBLR_CONSUMER_KEY,
  consumerSecret: TUMBLR_CONSUMER_SECRET,
  callbackURL: "http://analytics.theenergyissue.com/tumblr/authcallback"
},
function(token, tokenSecret, profile, done) {
  console.log('callback');

  tumblr.createClient({
    consumer_key: TUMBLR_CONSUMER_KEY,
    consumer_secret: TUMBLR_CONSUMER_SECRET,
    token: token,
    token_secret: tokenSecret
  });

  console.log('testing callback finished');


}));

module.exports = {

  // This loads the track new blog page --> new.ejs
  'new': function(req, res) {
    res.view();
  },

  create: function(req, res, next) {

    console.log('create tumblr with hostname: ' + req.param('hostname'));

    var tumblrObj = {
      hostname: req.param('hostname')
    }

    passport.authenticate('tumblr');

    console.log('pass.auth() should have been called');
  },


  // render the profile view (e.g. /views/show.ejs)
  show: function(req, res, next) {
    Tumblr.findOne(req.param('id'), function foundTumblr(err, tumblr) {
      if (err) return next(err);
      if (!tumblr) return next();


      client.userInfo(function (err, data) {
        if(err){
          console.log(err);
        }else{
          data.blogs.forEach(function (blog) {
              console.log(blog.name);
          });

          res.view({
            tumblr: tumblr
          });
        }
      });
    });
  },

  authcallback: function(req, res, next){
    console.log('authcallback()');

    passport.authenticate('tumblr', { failureRedirect: '/tumblr/new' });

    res.view();
  }


};
