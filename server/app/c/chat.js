'use strict';

var path = require('path'),
	config = require('../../config/environment');

exports.index = function(req, res) {
	res.sendFile(path.resolve(config.client + 'chatRoom.html'));
}