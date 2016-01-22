// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter',
  [
    // libs
    'ionic',
    'ionic-material',
    'ionMdInput',
    'ngCordova',
    'chart.js',
    'timer',
    // controllers
    'starter.controllers',
    'st.controllers',
    'login.controllers',
    'placement.controllers',
    'details.controllers',
    'timer.controllers',
    'stats.controllers',

    // directives
    'mydir'
  ])


  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.views.maxCache(0);

    /*
     // Turn off back button text
     $ionicConfigProvider.backButton.previousTitleText(false);
     */

    $stateProvider.state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

      .state('app.placements', {
        url: '/placements',
        views: {
          'menuContent': {
            templateUrl: 'templates/placements.html',
            controller: 'PlacementCtrl'
          }
        }
      })

      .state('app.timer', {
        url: '/timer',
        views: {
          'menuContent': {
            templateUrl: 'templates/timer.html',
            controller: 'TimerCtrl'
          }
        }
      })


      .state('app.stats', {
        url: '/stats',
        views: {
          'menuContent': {
            templateUrl: 'templates/stats.html',
            controller: 'StatsCtrl'
          }
        }
      })

      .state('app.shop', {
        url: '/shop',
        views: {
          'menuContent': {
            templateUrl: 'templates/shop.html',
            controller: 'ShopCtrl'
          }
        }
      })

      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
          }
        }
      })

      .state('app.details', {
        url: '/details/:idDefense',
        views: {
          'menuContent': {
            templateUrl: 'templates/details.html',
            controller: 'DetailsCtrl'
          }
        }
      })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
  });
