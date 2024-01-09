const GoogleStrategy = require("passport-google-oauth2");

module.exports = ({ env }) => ({
  auth: {
    secret:  env('ADMIN_JWT_SECRET', 'iO3quoYg265hlzq30E8RelQc0LOKle4R0yk6CMbgeHgGNcm_mR'),
    options: {
      expiresIn: "1d"
    },
  
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
});
