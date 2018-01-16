
const ErrorObject = require('amk-error');

let helloService;
let hello;

class HelloController {

	constructor(...dependencies) {
		[helloService, hello] = dependencies;
	}

	async get(req, res) {
		let value = await hello.get();
		return res.json({
			message: value
		});
	}

	async create(req, res) {
		let body = req.body;
		let message = body.message;

		if(message) {
			let uuid = await helloService.getId();
			helloService.log(uuid, message);
			hello.insert(uuid, message);
			res.json({
				id: uuid
			});
		} else {
			throw new ErrorObject('no input', 400);
		}
	}

}
module.exports = HelloController;
