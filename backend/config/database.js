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

/* module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '104.194.11.32'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'koisite'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', '9O3eci0egq64L7VmgrE3'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
 */