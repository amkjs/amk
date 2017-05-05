
const express = require('express');
const router = express.Router();
const wrap = require('../lib/wrapper');

module.exports = function (jsonParser, userValidator, userController) {
	router.post('/', jsonParser, userValidator.insert, wrap(userController.insert));
	router.get('/', wrap(userController.get));
	return router;
}
