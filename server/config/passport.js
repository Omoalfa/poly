const config = require('./config');

/*  Google AUTH  */

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const googleStrategy = new GoogleStrategy({
  clientID: config.google.client_id,
  clientSecret: config.google.client_secret,
  callbackURL: "/v1/auth/google/callback"
}, function (accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
})

module.exports = {
  googleStrategy,
};

