 module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'database-clientapi.cyf9zngcrkjn.us-east-1.rds.amazonaws.com'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'masterepk'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'p7JxjkbeIJ5piSnOJ038'),
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