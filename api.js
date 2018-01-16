/* no-console: "off" */

const express = require('express');
const responseTime = require('response-time');
const errorHandler = require('api-error-handler');

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
const helloRouter = require('./src/router/hello_router');

//instantiate models
const hello = new Hello();

// instantiate service
const helloService = new HelloService();

// instantiate validators
const helloValidator = new HelloValidator();

// instantiate controllers
const helloController = new HelloController(helloService,  hello);

app.use(responseTime());
app.use('/hellos', helloRouter(helloValidator, helloController));
app.use(errorHandler());

app.listen(3000, function(){
	console.log('running');
});
