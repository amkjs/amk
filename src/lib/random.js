const crypto = require('crypto');
const util = require('util');

function replace(extra) {
	extra = extra.replace(/\+/g, '')
		.replace(/\//g, '')
		.replace(/=+$/, '')
	return extra.split('');
}

module.exports = util.promisify((cb) => {
	crypto.randomBytes(12, (err, buf) => {
		let id = buf.toString('base64');
		let extra = replace(id.slice(12));
		// id = id.slice(0, 12);
		// from https://github.com/RGBboy/urlsafe-base64
		id = id.slice(0, 12)
			.replace(/\+/g, extra.pop()) // Convert '+' to '-'
			.replace(/\//g, extra.pop()) // Convert '/' to '_'
			.replace(/=+$/, ''); // Remove ending '='
		cb(err, id);
	});
});
