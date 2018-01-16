
const random = require('../lib/random');

class HelloService {

	getId() {
		return random();
	}

	log(key, value) {
		console.log('will insert', value, 'with an id of', key);
	}

}

module.exports = HelloService;
