angular.module('starter.services', [])

.factory('Chats', function($ionicScrollDelegate) {
    //聊天室列表
    var chats = [{
        title: '软件R6尊贵区',
        description: 'R6装逼之道，最为致命',
        titleimg: 'img/chatRoom1.jpg',
        id: 0,
        currentMsg: '',
        msgs: []
    }, {
        title: '暴走日区',
        description: '快说粗你的暴走史，艹',
        titleimg: 'img/chatRoom2.gif',
        id: 1,
        currentMsg: '',
        msgs: []
    }, {
        title: '秀恩爱专区',
        description: '有爱就得秀出来XD',
        titleimg: 'img/chatRoom3.png',
        id: 2,
        currentMsg: '',
        msgs: []
    }, {
        title: '文杰有多帅?',
        description: '不要害羞，大胆说粗来',
        titleimg: 'img/chatRoom4.jpeg',
        id: 3,
        currentMsg: '',
        msgs: []
    }]

    return {
        all: function() {
            return chats;
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        },
        remove: function(chat) {
        	chats.splice(chats.indexOf(chat), 1);
        },
        pushMsg: function(data) {
          chats[data.chatId].msgs.push(data);
          chats[data.chatId].currentMsg = data.name + '：' +data.msg;
          if(chats[data.chatId].msgs.length > 20) {
            chats[data.chatId].msgs.shift();
          }
          $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom(true);
        }

    }
})

.factory('Socket', function($rootScope, Chats){
    var socket = io('http://localhost:18080/');
   // var socket =  io('http://chatroom123.duapp.com/');
    socket.on('open', function(msgs){
        console.log('打开连接了'); 
        $rootScope.$apply(function(){
            for(var i = 0, len = msgs.length; i < len; i++ ) {
                Chats.pushMsg(msgs[i]);
            }
        });
    });

    socket.on('msg', function(data) {
        console.log(data);
        $rootScope.$apply(function(){
            Chats.pushMsg(data);
        })
    });

    return socket;
})

.factory('User', function($rootScope){
    //用户列表
    // var user = [{
    //     name:'周星驰',
    //     headimg: 'img/1.jpg',
    //     username:'1',
    //     password:'1'
    // }, {
    //     name:'朱茜',
    //     headimg: 'img/2.jpg',
    //     username:'2',
    //     password:'2',
    // }];

    var me, i, len;

    if(window.localStorage['username']) {
        $rootScope.loginData = {
            username: window.localStorage['username']
        }
        me = {
            name: window.localStorage['username'],
            headimg: window.localStorage['headimg']
        }
        // for(i = 0, len = user.length; i < len; i++ ) {
        //     if(user[i].name == window.localStorage['user']) {
        //         me = user[i];
        //         break;
        //     }
        // }
    }

    function randomImg() {
        return (Math.floor(Math.random() * 20) + 1) + '.jpg';
    }

    return {
        signin: function(username, password) {
            var i, len;
            for(i = 0, len = user.length; i < len; i++ ) {
                if(user[i].username == username && user[i].password == password) {
                    me = user[i];
                    window.localStorage['user'] = user[i].name;
                    return user[i];
                }
            }
            return null;
        },
        signout: function() {
            delete window.localStorage['user'];
        },
        myInfo: function(){
            return me;
        },
        changeName: function(newName){
            window.localStorage['username'] = newName;
            window.localStorage['headimg'] = 'img/' + randomImg();
            return me = {
                name: newName,
                headimg: window.localStorage['headimg']
            }
        }
    }
});





