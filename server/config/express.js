'use strict';

var path = require('path'),
	compression = require('compression'),
	bodyParser = require('body-parser'),
	express = require('express'),
	config = require('./environment');

module.exports = function(app){

	app.set('view engine', 'ejs');
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false}));
    app.use(bodyParser.json());
    app.use(express.static(path.join(config.root, 'client')));
    app.set('appPath', 'client');
}