var Person = require('./person');
var Express = require('express');

var app = Express();

var rami = new Person('Rami', 'Amayre');
rami.sayHello();