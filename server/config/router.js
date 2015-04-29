'use strict';

var chat = require('../app/c/chat');

module.exports = function(app) {
	//发送静态文件
	app.get('/', chat.index);

}
