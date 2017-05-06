
const Mongo = require('./mongo');

class User extends Mongo {

	constructor() {
		super('user');
	}
	
}
module.exports = User;
