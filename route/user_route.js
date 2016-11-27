'use strict'

const express = require('express');
const router = express.Router();
const co = Promise.coroutine;

function init(jsonParser, userValidator, userController) {
	router.post('/', jsonParser, userValidator.insert, co(userController.insert));
	router.get('/', co(userController.get));
}

module.exports = {
	route: router,
	init: init
}
