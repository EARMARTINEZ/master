const cronTasks = require("./cron-tasks");


module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1381), 
  url:'https://devmaster.epkweb.com',  
  
  
  
  url: env('PUBLIC_URL', ''),
  proxy: true,
  admin: {
      url: env('PUBLIC_ADMIN_URL', '/'),
      auth: {
          secret: env('ADMIN_JWT_SECRET', ''),
      },

    
  },

  app: {
    keys: env.array('APP_KEYS'),
  },

  cron: {
    enabled: false,
    tasks: cronTasks,
  },

 
});
