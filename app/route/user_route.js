'use strict'

const express = require('express');
const router = express.Router();
const co = Promise.coroutine;

let jsonParser;
let userValidator;
let userController;

router.post('/users', jsonParser, userValidator.insert, co(userController.insert));
router.get('/users', co(userController.get));

module.exports = {
	route: router,
	instantiate: function (JsonParser, UserValidator, UserController) {
		jsonParser = JsonParser;
		userValidator = UserValidator;
		userController = UserController;
	}
}
