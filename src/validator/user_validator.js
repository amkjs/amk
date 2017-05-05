
const AmkError = require('../../lib/amk_error');

class UserValidator {

	insert(req, res, next) {
		let body = req.body;

		let err = [];
		let errObj;
		if (!body.username) {
			err.push('no username');
		}

		if (!body.password) {
			err.push('no password');
		}
		if (err.length > 0) {
			errObj = new AmkError(err, 400);
		}

		next(errObj);

	}

}

module.exports = UserValidator;
