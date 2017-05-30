
const knex = require('knex');
const config = require('../../config').app.db;
let db;

module.exports = function () {
	if (db) {
		return db;
	} else {
		let conn = {
			host: config.host,
			user: config.user,
			password: config.password,
			database: config.database
		};
		db = knex({
			client: config.driver,
			connection: conn
		});
		return db;
	}
}
