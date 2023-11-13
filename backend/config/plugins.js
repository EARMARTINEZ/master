module.exports = ({ env }) => ({
    // ...
    'users-permissions': {
      config: {
        jwt: {
          expiresIn: '7d',
        },
      },
    },
   

  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST'),
        // port: env('SMTP_PORT'),
        port: 465,
        secure: true, 
         //ignoreTLS: true,
      
        auth: {       
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        
        pool: true,
        logger: true,
        debug: true,
        maxConnections: 10000
      },
      
      settings: {
        defaultFrom: env('DEFAULT_EMAIL'),
        defaultReplyTo: env('DEFAULT_EMAIL'),
      },
    },
  },

   //...
   'import-export-entries': {
    enabled: true,
    config: {
      // See `Config` section.
    },
  },
  //...
  });