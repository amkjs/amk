'use strict';

const knex = require('knex');
const co = Promise.coroutine;

let db;

class sqlite {

	static connect () {
		if (db) {
			return db;
		} else {
			db = knex({
				client: 'sqlite3',
				connection: {
					filename: '../data/reminddb.sqlite'
				},
				useNullAsDefault: true
			});
			this.createSchema();
			return db;
		}
	}

	static createSchema () {
		co(function* () {
			yield db.schema.createTableIfNotExists('user', function (table) {
				table.increments();
				table.string('username');
				table.string('password');
				table.string('salt');
				table.timestamps(false, true);
			});
		})();
	}
}
module.exports = sqlite;
