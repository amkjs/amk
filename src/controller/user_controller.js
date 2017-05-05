let userService;
let user;

class UserController {

	constructor(UserService, User) {
		userService = UserService;
		user = User;
	}

	async get(req, res) {
		let data = await user.find();
		res.json(data);
	}

	async insert(req, res) {
		let body = req.body;
		let rs = await user.insert({
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
