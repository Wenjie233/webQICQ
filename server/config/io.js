'use strict';

module.exports = function(app) {

	var server = require('http').createServer(app),
		io = require('socket.io')(server);

	//设置日志级别
	io.set('log level', 1);


    console.log('ffffff');
	//监听链接事件
	io.on('connection', function(socket){
		//通知客户端已连接
		socket.emit('open');

		//打印握手信息
		console.log(socket.handshake);

		//构造客户端对象
		var client = {
			socket: socket,
			name: false,
			headimg: false,
			isSignin: true,
		}


		socket.on('msg', function(msg) {
			console.log(msg);
		})

		socket.on('signin', function(msg){

		});

		socket.on('setName', function(msg){
			client.name = msg;
		})

		socket.on('message', function(msg){
			if(isSignin){
				var obj = {
					text: msg,
					headimg: client.headimg,
					name: client.name
				}

				socket.emit('message', obj);
				socket.to('others').emit('message', obj);

			} else {
				socket.emit('noSignin', '信息验证失败，请重新登陆');
			}
		});

		socket.on('disconnect', function(){
			var obj = {
				author: 'System',
				text: client.name,
				type: 'disconnect'
			}

			//广播用户已退出
			socket.to('others').emit('system', obj);
			console.log(client.name + ' disconnect');
		});


	});

}