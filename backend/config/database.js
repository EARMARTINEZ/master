 module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'bd_devmaster'),
      user: env('DATABASE_USERNAME', 'master'),
      password: env('DATABASE_PASSWORD', '9K-KU71Y7e*WYzIxh+^RTwu6+gzjVQC^'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
}); 