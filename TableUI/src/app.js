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

var tagColors = {A6: "red", 1: "blue", 20: "green", C4: "purple"};
var availableColors = {
  grey: [0, 0, 0, 0.2],
  orange: [255,120,50,1],
  yellow: [253,214,0,1],
  green: [140,210,17,1],
  cyan: [0,180,160,1],
  blue: [85,150,230,1],
  purple: [152,85,212,1],
  pink: [255,60,160,1],
  red: [231,29,50,1]
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