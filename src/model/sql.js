
const db = require('../lib/sql').connect();

class SQL {

	constructor(table) {
		this.TABLE = table;
	}

	find(id) {
		let query = db.select().from(this.TABLE)
		if (id) {
			query.where('id', id);
		}
		return query;
	}

	insert(params) {
		return db(this.TABLE).insert(params);
	}

	getDB() {
		return db(this.TABLE);
	}


}

module.exports = SQL;
