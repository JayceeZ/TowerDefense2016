/**
 * @author Jean-Christophe Isoard
 */

var appTable = angular.module('appTable', ['ngRoute']);

appTable.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/home', {
      templateUrl: 'src/partials/home.html',
      controller: 'HomeCtrl'
    }).
    when('/map', {
      templateUrl: 'src/partials/map.html',
      controller: 'MapCtrl'
    }).
    otherwise({
      redirectTo: '/home'
    });
  }]);