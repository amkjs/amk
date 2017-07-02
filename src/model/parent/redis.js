
const db = require('../../lib/redis')()

class Redis {

	constructor(table) {
		this.TABLE = table;
	}

	find(key) {
		return db.get(this.getKey(key));
	}

	insert(key, value) {
		let k = this.getKey(key);
		return db.set(k, value).then(() => {
			return k;
		})
	}

	del(key) {
		return db.del(this.getKey(key))
	}

	getKey(key) {
		return this.TABLE + '_' + key;
	}

}

module.exports = Redis;
