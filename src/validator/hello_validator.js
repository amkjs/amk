
const AmkError = require('../lib/amk_error');

class HelloValidator {

	insert(req, res, next) {
		let body = req.body;

		let err = [];
		let errObj;
		if (!body.msg) {
			err.push('no message');
		}

		if (err.length > 0) {
			errObj = new AmkError(err, 400);
		}

		next(errObj);
	}
}

module.exports = HelloValidator;
