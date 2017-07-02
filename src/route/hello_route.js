
const express = require('express');
const router = express.Router();
const wrap = require('../lib/wrapper');

module.exports = function (jsonParser, helloValidator, helloController) {
	// router.post('/', jsonParser, userValidator.insert, wrap(userController.create));
	router.get('/:id', wrap(helloController.get));
	router.get('/', wrap(helloController.get));
	router.post('/', jsonParser, wrap(helloController.create))
	router.delete('/:id', wrap(helloController.del))
	// router.delete('/:id', wrap(userController.del));
	// router.delete('/', jsonParser, userValidator.del, wrap(userController.del));
	return router;
}
