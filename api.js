/* eslint no-global-assign: "off", no-console: "off" */

Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();

// models
const User = require('./src/model/user');

// services
const UserService = require('./src/service/user_service');

// validators
const UserValidator = require('./src/validator/user_validator');

//controllers
const UserController = require('./src/controller/user_controller');

// middleswares
const errorHandler = require('./src/middleware/error_handler');

// routes
const userRoute = require('./src/route/user_route');

//instantiate models
const user = new User();

// instantiate service
const userService = new UserService();

// instantiate validators
const userValidator = new UserValidator();

// instantiate controllers
const userController = new UserController(userService, user);

app.use('/users', userRoute(jsonParser, userValidator, userController));

app.use(errorHandler);

app.listen(3000, function(){
	console.log('running');
});
