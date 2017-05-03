'use strict'

let userService;
let user;

class UserController {

	constructor(UserService, User) {
		userService = UserService;
		user = User;
	}

	* get(req, res) {
		let data = yield user.find();
		res.json(data);
	}

	* insert(req, res) {
		let body = req.body;
		let rs = yield user.insert({
			username: body.username,
			password: body.password,
			salt: body.salt
		});

		if (rs.length > 0) {
			res.json(201);
		}
	}

}
module.exports = UserController;
