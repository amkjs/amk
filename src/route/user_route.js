
const express = require('express');
const router = express.Router();
const wrap = require('../lib/wrapper');

module.exports = function (jsonParser, userValidator, userController) {
	router.post('/', jsonParser, userValidator.insert, wrap(userController.create));
	router.get('/:id', wrap(userController.read));
	router.get('/', wrap(userController.read));
	router.delete('/:id', wrap(userController.del));
	// router.delete('/', jsonParser, userValidator.del, wrap(userController.del));
	return router;
}
