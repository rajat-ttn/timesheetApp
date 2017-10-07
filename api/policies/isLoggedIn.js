"use strict";
/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */

let request = require('request');

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

  request(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${ token }`, (err, response, body) => {
      body = JSON.parse(body);
      if(err || body.error_description === "Invalid Value"){
          return res.status(401).send();
      } else {
          req.user = body;
          next();
      }
  })
};
