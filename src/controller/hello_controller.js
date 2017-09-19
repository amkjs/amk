
const ErrorObject = require('amk_error');
const random = require('../lib/random');

let helloService;
let hello;

class HelloController {

	constructor(...dependencies) {
		[helloService, hello] = dependencies;
	}

	async get(req, res) {
		let params = req.params
		let value = await hello.find(params.id);
		if (value) {
			res.json({
				msg: value
			});
		} else {
			throw new ErrorObject('not found', 404);
		}
	}

	async create(req, res) {
		let body = req.body;
		let msg = body.msg;

		if(msg) {
			let uuid = await random();
			helloService.log(uuid, msg);
			await hello.insert(uuid, msg);
			res.json({
				id: uuid
			});
		}
	}

	async del(req, res) {
		let params = req.params
		await hello.del(params.id);
		res.status(200).send('ok');
	}
}
module.exports = HelloController;
