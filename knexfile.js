// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/notegenix_todos',
    migrations: {
      directory: './knex/migrations',
    },
    seeds: {
      directory: './knex/seeds'
    }
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/test-notegenix_todos',
    migrations: {
      directory: './knex/migrations',
    },
    seeds: {
      directory: './knex/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './knex/migrations',
    },
    seeds: {
      directory: './knex/seeds'
    }
  }

};
