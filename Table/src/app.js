/**
 * @author Jean-Christophe Isoard
 */

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

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