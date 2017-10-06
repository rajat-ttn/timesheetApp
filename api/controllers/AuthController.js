"use strict";

const passport = require('passport')
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
    ;

let AuthController = {

  login: (req, res) => {
    return res.view()
  }

  , google: (req, res) => {

      passport.use(new GoogleStrategy({
        clientID: sails.config.googleClientId
        , clientSecret: sails.config.googleAppSecret
        , callbackURL: sails.config.googleCallBackUrl
      }, AuthService.verifyCredentials));

      passport.authenticate('google', { scope: ['profile', 'email'] })(req, res);
  },

  googleCallback: (req, res) => {
      passport.authenticate('google',
          function(err, user) {
              sails.log.error(user.token);
              return res.redirect('/#!/dbd?token=' + user.token);
              /*if(!user){
                  //return res.json({success: true, data: user})
                  return res.view('login')
              }*/
          })(req, res);
  }
}

module.exports = AuthController;
