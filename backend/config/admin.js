const GoogleStrategy = require("passport-google-oauth2");

module.exports = ({ env }) => ({
  auth: {
    secret:  env('ADMIN_JWT_SECRET', '62ec6d0c9e454821e1e7f67b2e70d24a'),
    options: {
      expiresIn: "1d"
    },
  
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
});
