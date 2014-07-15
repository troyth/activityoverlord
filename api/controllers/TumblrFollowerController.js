/**
 * TumblrFollowerController
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

var tumblrFollowerController = {

  'index': function(req, res){

    var tumblr = require('tumblr.js');

    var tumblrClient = tumblr.createClient({
      consumer_key: 'AlGQ1aWiD6D2M5alqTbeM5Et7wQR0e9OvixCtAT9YpDqKCK3bI',
      consumer_secret: 'AfRbdjWLOzcghJJr7u4YFjYTIMT9hPwq9Eb8n4BqwOim5UtV29',
      token: 'dMwGcfLnaQ41Cb6GDQOD0CCZdEr82p5lvAbR2ltnDMl7rRS1Gs',
      token_secret: 'VkQrDv7EBPAwCwPLCC4G6nK0yATmCeuV4TBNBrymdi3OEztXNv'
    });

    tumblrClient.followers('theenergyissue', function (err, data) {
      console.log('followers data:');
      console.dir(data);

      var followers = data.total_users;

      res.view({title: 'Tumblr', followers: followers, name: "Weekly Following Goal" });
    });

  },

  'update': function(req, res){

    console.log('-------update-------');

    var tumblr = require('tumblr.js');

    var tumblrClient = tumblr.createClient({
      consumer_key: 'AlGQ1aWiD6D2M5alqTbeM5Et7wQR0e9OvixCtAT9YpDqKCK3bI',
      consumer_secret: 'AfRbdjWLOzcghJJr7u4YFjYTIMT9hPwq9Eb8n4BqwOim5UtV29',
      token: 'dMwGcfLnaQ41Cb6GDQOD0CCZdEr82p5lvAbR2ltnDMl7rRS1Gs',
      token_secret: 'VkQrDv7EBPAwCwPLCC4G6nK0yATmCeuV4TBNBrymdi3OEztXNv'
    });

    tumblrClient.followers('theenergyissue', function (err, data) {
      console.log('total followers:');
      console.dir(data.total_users);

      var followers = data.total_users;


      _.each(data.users, function(user){

        TumblrFollower.findOne({ name: user.name }).done(function(err, u){
          if(err) {
            console.log('error in findOne: ' + err);
          }else{
            console.log('\nu:');
            console.dir(u);
          }
        });

      });



      res.send(200);
    });


  }

};

module.exports = tumblrFollowerController;
