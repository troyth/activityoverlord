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

    // Track a Tumblr with the params sent from
    // the sign-up form --> new.ejs
    Tumblr.create(tumblrObj, function tumblrCreated(err, tumblr) {

      // // If there's an error
      // if (err) return next(err);

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }

        // If error redirect back to sign-up page
        return res.redirect('/tumblr/new');
      }

      // After successfully creating the user
      // redirect to the show action
      // From ep1-6: //res.json(user);

      locals.test = 'test';


      res.redirect('/tumblr/show/' + tumblr.id);
    });
  },


  // render the profile view (e.g. /views/show.ejs)
  show: function(req, res, next) {
    Tumblr.findOne(req.param('id'), function foundTumblr(err, tumblr) {
      if (err) return next(err);
      if (!tumblr) return next();

        console.log('local:');
        console.dir(locals);

      res.view({
        tumblr: tumblr
      });
    });
  },


};
