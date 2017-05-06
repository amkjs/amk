
let userService;
let user;

class UserController {

	constructor(UserService, User) {
		userService = UserService;
		user = User;
	}

	async read(req, res) {
		let query = req.params;
		let id = query.id;
		let data = await (id ? user.findById(id) : user.find());
		res.json(data);
	}

	async create(req, res) {
		let body = req.body;
		await user.insertOne({
			username: body.username,
			description: body.description
		});
		res.status(201).end();
	}

	async update(req, res) {

	}

	async del (req, res) {
		let params = req.params;
		await user.deleteById(params.id)
		res.status(200).end();
	}

}
module.exports = UserController;
