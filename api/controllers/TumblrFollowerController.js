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


// function set up to do async recursion on adding new tumblr followers
// param: user returned from the tumblr API call
function updateFollower(users, index, next){
  var user = users[index];

  TumblrFollower.findOne({ name: user.name }).done(function(err, u){
    if(err) {
      console.log('error in findOne: ' + err);
    }else{
      console.log('\nu:');
      console.dir(u);

      var fetchedUserObj = {
        name: user.name,
        url: user.url,
        updated: parseInt(user.updated),
        following: user.following
      };

      console.log('fetchedUserObj:');
      console.dir(fetchedUserObj);

      if(typeof u != 'undefined'){
        // already in DB, so update it
        TumblrFollower.update(u.id, fetchedUserObj, function followerUpdated(err) {
          if (err) {
            return res.redirect('/user/edit/' + req.param('id'));
          }

          res.redirect('/user/show/' + req.param('id'));
        });
      }else{
        // not already in DB, so add it
        TumblrFollower.create(fetchedUserObj, function tumblrFollowerCreated(err, newUser) {
          if(err){
            console.log('error trying to create TumblrFollower: '+ err);
            console.dir(err);
            console.dir(err.ValidationError.updated);
          }


          index++;
          if(users.length > index){
            updateFollower(users, index, next);
          }else{
            next();
          }
        });
      }
    }
  });

};

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


      updateFollower(data.users, 0, null);



      res.send(200);
    });


  }

};

module.exports = tumblrFollowerController;
