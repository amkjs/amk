/* eslint no-console: "off", no-unused-vars: "off" */
module.exports = function (err, req, res, next) {
	console.error('error', err.stack);
	let code = err.status || 500;
	res.status(code);
	res.json({
		err: {
			code: code,
			message: err.message
		}
	});
}
