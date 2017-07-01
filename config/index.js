/*eslint no-process-env: "off"*/

const _ = require('lodash');
let appRoute = './env/';
let env;

switch (process.env.NODE_ENV) {
	case 'production': {
		env = 'prod';
		break;
	}
	case 'ci': {
		env += 'ci';
		break;
	}
	case 'docker': {
		env += 'docker';
		break;
	}
	default: {
		env += 'dev';
		break;
	}
}
appRoute += env + '/app.json'

const app = require(appRoute);

let appConfig = {
    db: {
		host: app.sql.host || "localhost",
		user: app.sql.user,
		password: app.sql.password || '',
		port: app.sql.port || 3306,
		database: app.sql.database || "development",
		driver: app.sql.driver
	},
    mongo: {
		hosts: app.mongo.hosts,
		user: app.mongo.user || '',
		password: app.mongo.password || '',
		database: app.mongo.database || '',
		options: app.mongo.options || ''
	},
    redis: {
		host: app.redis.host,
		port: app.redis.port,
		family: app.redis.family,
		db: app.redis.db
	},
	port: app.port || 3000
}
module.exports = {
	app: _.clone(appConfig)
}
