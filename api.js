/* eslint no-global-assign: "off", no-console: "off" */

Promise = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('api-error-handler');
const jsonParser = bodyParser.json();

const app = express();

// models
const Hello = require('./src/model/hello');

// services
const HelloService = require('./src/service/hello_service');

// validators
const HelloValidator = require('./src/validator/hello_validator');

//controllers
const HelloController = require('./src/controller/hello_controller');

// middlewares


// routes
const helloRoute = require('./src/route/hello_route');

//instantiate models
const hello = new Hello();

// instantiate service
const helloService = new HelloService();

// instantiate validators
const helloValidator = new HelloValidator();

// instantiate controllers
const helloController = new HelloController(helloService,  hello);

app.use('/hellos', helloRoute(jsonParser, helloValidator, helloController));

app.use(errorHandler());

app.listen(3000, function(){
	console.log('running');
});
