'use strict';

var path = require('path'),
	_ = require('lodash');

var all  = {
	env: process.env.NODE_ENV,
	// Root path of server
	root: path.normalize(__dirname + '/../../../'),
	// Server port
    port: process.env.PORT || 18080,

    client: path.normalize(__dirname + '/../../../client/'),

}

module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') ||{}
);

