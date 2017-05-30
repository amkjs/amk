
const MongoClient = require('mongodb').MongoClient;
const config = require('../../config').app.mongo;

let mongo;

function buildMongoUrl() {
	let hosts = config.hosts;
	let length = hosts.length;
	let host = '';
	for (let i = 0; i < length; i++) {
		host += hosts[i];
		if (i < length-1) {
			host += ',';
		}
	}
	let url = 'mongodb://'
	if (config.user) {
		url += config.user + ':'
	}
	if (config.password) {
		url += config.password + '@'
	}
	url += host + '/'
	url += config.database;
	if (config.options) {
		url += '?';
		url += config.options;
	}
	return url;
}

module.exports = function () {
	if (!mongo) {
		mongo = MongoClient.connect(buildMongoUrl());
	}
	return mongo;
}
