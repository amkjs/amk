// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dbdev.sqlite3.db'
    }
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    }
  },

};
