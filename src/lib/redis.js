const Redis = require('ioredis');

let db;
module.exports = function () {
	if (db) {
		return db;
	} else {
		db = new Redis(6379, '192.168.99.100');
		return db;
	}
}
