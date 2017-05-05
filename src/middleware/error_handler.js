/* eslint no-console: "off" */
module.exports = function (err, req, res) {
	console.log('error', err.stack);
	let code = err.status || 500;
	res.status(code);
	res.json({
		err: {
			code: code,
			message: err.message
		}
	});
}
