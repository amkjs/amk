
const Redis = require('./parent/redis');

class Hello extends Redis{

	constructor() {
		super('hello');
	}

}

module.exports = Hello;
