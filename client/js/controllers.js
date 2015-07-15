angular.module('starter.controllers', [])

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, User) {

    $rootScope.me = User.myInfo();

    // Form data for the login modal
    if(!$rootScope.loginData)  $rootScope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $rootScope
    }).then(function(modal) {
        $rootScope.modal = modal;
    });

    // Triggered in the login modal to close it
    $rootScope.closeLogin = function() {
        $rootScope.modal.hide();
    };

    // Open the login modal
    $rootScope.login = function() {
        $rootScope.modal.show();
    };
    $rootScope.signout = function(){
        $rootScope.me = null;
        User.signout();
    }
   
    // Perform the login action when the user submits the login form
    $rootScope.doLogin = function() {
        console.log('Doing login', $rootScope.loginData);
        $rootScope.me = User.changeName($rootScope.loginData.username);
        // if($rootScope.me) {
        //     alert('登陆成功');
        $rootScope.closeLogin();
        // } else {
        //     alert('登陆失败');
        // }
    };
})

.controller('ChatsCtrl', function($scope, Chats) {
    $scope.chats = Chats.all();
})

.controller('ChatCtrl', function($scope, $rootScope, $stateParams, Chats, Socket, User, $ionicScrollDelegate, $timeout) {
    $rootScope.chat = Chats.get($stateParams.chatId);
    $scope.myMsg = '';

    $timeout(function() {
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom(true);
    }, 0);
    
    $scope.sendMsg = function() {
        if($scope.myMsg == '') return ;
        var data = {
            chatId: $stateParams.chatId,
            name: User.myInfo().name,
            headimg: User.myInfo().headimg,
            msg: $scope.myMsg
        }
        // $scope.chat.msgs.push(msg);
        Socket.emit('msg', data);
        $scope.myMsg = '';
        // $ionicScrollDelegate.$getByHandle('mainScroll').resize();
        // $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom(true);  
    }
});