'use strict'

const SQL = require('./sql');

class User extends SQL{
	constructor() {
		super('user');
	}
}
module.exports = User;
