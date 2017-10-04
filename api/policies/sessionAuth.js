/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

let GoogleAuth = require('google-auth-library')
    , auth = new GoogleAuth
    , client = new auth.OAuth2(sails.config.googleClientId, sails.config.googleAppSecret, sails.config.googleCallBackUrl)
    ;
module.exports = function(req, res, next) {

  let authorizationHeader = req.headers['authorization']
      , token
      ;

  if(authorizationHeader){
    token = authorizationHeader.split('Bearer ');
    if(token && token.length === 2){
        token = token[1];
    }
  }

  client.verifyIdToken(
      token,
      sails.config.googleClientId,
      function(err, login) {
        var payload = login.getPayload();
        var userid = payload['sub'];
        req.user = user;
      });
    
  return res.json({err: null});

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  //return res.forbidden('You are not permitted to perform this action.');
};
