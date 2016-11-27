'use strict';
Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();

// models
const User = require('./app/model/user');

// services
const UserService = require('./app/service/user_service');

// validators
const UserValidator = require('./app/validator/user_validator');

//controllers
const UserController = require('./app/controller/user_controller');

// middleswares
const errorHandler = require('./app/middleware/error_handler');

// routes
const userRoute = require('./route/user_route');

//instantiate models
const user = new User();

// instantiate service
const userService = new UserService();

// instantiate validators
const userValidator = new UserValidator();

// instantiate controllers
const userController = new UserController(userService, user);

// init routes
userRoute.init(jsonParser, userValidator, userController);

app.use('/users', userRoute.route);

app.use(errorHandler);

app.listen(3000, function(){
	console.log('running');
});
