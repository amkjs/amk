
const ErrorObject = require('amk-error');

class HelloValidator {

	insert(req, res, next) {
		let body = req.body;

		let err = [];
		let errObj;
		if (!body.message) {
			err.push('no message field');
		}

		if (err.length > 0) {
			errObj = new ErrorObject(err, 400);
		}

		next(errObj);
	}
}

module.exports = HelloValidator;
