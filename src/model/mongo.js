const mongo = require('../lib/mongo')
const ObjectID = require('mongodb').ObjectID;
const LIMIT = 20;

class Mongo {

    constructor(table) {
		this.TABLE = table;
		this.db = mongo();
	}

    load() {
		let _this = this;
		return this.db.then((db) => {
			return db.collection(_this.TABLE);
		});
	}

    findOne(param) {
		return this.load().then((db) => {
			return db.find(param).limit(1).next();
		});
	}

	find(param) {
		return this.load().then((db) => {
			return db.find(param).limit(LIMIT).toArray();
		});
	}

    findAll(param) {
        return this.load().then((db) => {
			return db.find(param).toArray();
		});
    }

    insertOne(doc, options) {
        return this.load().then((db) => {
            return db.insertOne(doc, options);
        })
    }

    insertMany(docs, options) {
        return this.load().then((db) => {
            return db.insertMany(docs, options);
        })
    }

    updateOne(filter, update, options) {
        return this.load().then((db) => {
            return db.updateOne(filter, update, options);
        })
    }

    updateMany(filter, update, options) {
        return this.load().then((db) => {
            return db.updateMany(filter, update, options);
        })
    }

    deleteOne(filter, options) {
        return this.load().then((db) => {
            return db.deleteOne(filter, options);
        })
    }

    deleteMany(filter, options) {
        return this.load().then((db) => {
            return db.deleteOne(filter, options);
        })
    }

    findOneAndUpdate(filter, update, options) {
        return this.load().then((db) => {
            return db.findOneAndUpdate(filter, update, options);
        })
    }

    sum(query, options) {
        return this.load().then((db) => {
            return db.count(query, options);
        });
    }

    aggregate(param) {
		return this.load().then((db) => {
			return db.aggregate(param).toArray();
		});
	}

    toObjectID(id) {
		return new ObjectID(id);
	}
}
module.exports = Mongo;
