'use strict';

var app = require('express')(),
    path = require('path'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    express = require('express');


app.use(compression());
app.use(express.static(__dirname + '/../client'));


//连接代码
var server = require('http').createServer(app),
    io = require('socket.io')(server);

//设置日志级别
// io.set('log level', 1);

//人数
var num = 0;

//聊天记录保持
var msgs = [],
    msgsLength = 60;

//监听链接事件
io.on('connection', function(socket) {
    num ++ ;
    console.log('当前在线人数：'+ num);
    
    //通知客户端已连接
    socket.emit('open',msgs);

    //打印握手信息
    // console.log(socket.handshake);

    // //构造客户端对象
    var client = {
        socket: socket,
        name: false,
        headimg: false,
        isSignin: true,
    }

    socket.on('msg', function(msg) {
    	console.log(msg);
        var now = new Date();
        msg.time = now.getHours() + ':' + now.getMinutes();
        socket.emit('msg', msg);
        msgs.push(msg);
        if(msgs.length >= msgsLength) msgs.shift();
        console.log('消息存量为:' + msgs.length );
       // socket.to('others').emit('msg', msg);
        socket.broadcast.emit('msg', msg);
    });

    socket.on('disconnect', function() {
        num --;
        var obj = {
            author: 'System',
            text: client.name,
            type: 'disconnect'
        }
        //广播用户已退出
        socket.to('others').emit('system', obj);
        console.log('一个socket断开');
    });


});


//监听端口
server.listen(18080, function(){
	console.log('listen 18080 port');
});

