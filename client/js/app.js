// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.filters'])

.run(function($ionicPlatform, $rootScope, Socket) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart', function(event, next, current) {
      console.log('路由经过：' + next.name);
      console.log(window.localStorage);
      if(next.name === 'app.single' && !window.localStorage['username']){
          event.preventDefault();
          $rootScope.login();
      }
  })


})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })


    .state('app.chats', {
      url: "/chats",
      views: {
        'menuContent': {
          templateUrl: "templates/chats.html",
          controller: 'ChatsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/chats/:chatId",
    views: {
      'menuContent': {
        templateUrl: "templates/chat.html",
        controller: 'ChatCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/chats');
});
