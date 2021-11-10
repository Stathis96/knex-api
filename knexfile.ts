// Update with your config settings.

module.exports = {

  development: {
    client: "mysql",
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'knex-project',
      charset: 'utf8'
    },
    migrations: {
      extension: 'ts'
    }    
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};
