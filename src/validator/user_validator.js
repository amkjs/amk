
const AmkError = require('../lib/amk_error');

class UserValidator {

	insert(req, res, next) {
		let body = req.body;

		let err = [];
		let errObj;
		if (!body.username) {
			err.push('no username');
		}

		if (err.length > 0) {
			errObj = new AmkError(err, 400);
		}

		next(errObj);
	}
	
	del(req, res, next) {
		let body = req.body;
		let err = [];
		let errObj;
		if (!Array.isArray(body)) {
			err.push('not an array');
		}

		if (err.length > 0) {
			errObj = new AmkError(err, 400);
		}

		next(errObj);
	}

}

module.exports = UserValidator;
