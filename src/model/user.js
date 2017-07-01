
const Mongo = require('./parent/mongo');

class User extends Mongo {

	constructor() {
		super('user');
	}

}
module.exports = User;
