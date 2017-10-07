/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }

  googleClientId: '975789717172-1rr1cemacehedgm44kmq7ci9a4lvm974.apps.googleusercontent.com'
  , googleAppSecret: 'lnZ2u-uMpY-C_qZzDAookQFN'
  , googleCallBackUrl: 'http://localhost:1337/auth/google/callback'
  , smtpConfig : {
    host: "smtp.gmail.com"
    , secureConnection: false
    , port: 587
    , auth: {
      user: "maxlifeemail@gmail.com"
      , pass: "max@life"
    }
  }

};
