
const express = require('express');
const router = express.Router();
const wrap = require('amk-wrap');

module.exports = function (jsonParser, helloValidator, helloController) {
	router.get('/:id', wrap(helloController.get));
	router.get('/', wrap(helloController.get));
	router.post('/', jsonParser, helloValidator.insert, wrap(helloController.create))
	router.delete('/:id', wrap(helloController.del))
	return router;
}
