
const express = require('express');
const router = express.Router();
const wrap = require('amk-wrap');

const jsonParser = express.json();

module.exports = function (helloValidator, helloController) {
	router.get('/', wrap(helloController.get));
	router.post('/', jsonParser, helloValidator.insert, wrap(helloController.create))
	return router;
}
