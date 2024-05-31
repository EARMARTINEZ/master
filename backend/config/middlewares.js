module.exports = [
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: "strapi::body",
    config: {
      formLimit: "256mb", // modify form body
      jsonLimit: "256mb", // modify JSON body
      textLimit: "256mb", // modify text body
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // multipart data, modify here limit of uploaded file size
      },
    },
  },
  //'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',

  {
    name: 'strapi::compression',
    config: {
      enabled: true,
      options: {
        filter: (content_type) => /text|application\/json/.test(content_type),
        threshold: 1024, // Comprime solo las respuestas mayores a 1 KB
        gzip: {
          flush: require('zlib').constants.Z_SYNC_FLUSH,
        },
        deflate: {
          flush: require('zlib').constants.Z_SYNC_FLUSH,
        },
        br: false // Brotli no está habilitado por defecto
      },
    },
  },
];
