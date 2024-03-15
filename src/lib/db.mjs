import knex from 'knex';

import { Config } from '../../config/config.mjs'

export const db = knex({
  client: 'sqlite3',
  connection: {
    filename: Config.DB
  },
  useNullAsDefault: true,
});