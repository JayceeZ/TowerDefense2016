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

appTable.controller('markersCtrl',  function($scope, socket) {
  $scope.markers = [];

  socket.on('updateMarker', function(message) {
    if(message.x <= 1 && message.y <= 1) {
      var marker = _.find($scope.markers, {id: message.id});
      if(!marker) {
        marker = new Marker(message.id);
        $scope.markers.push(marker);
      }
      var map = angular.element('#viewport');
      var x = message.x * map[0].clientWidth;
      var y = message.y * map[0].clientHeight;
      marker.setX(x);
      marker.setY(y);
      marker.setOrientation(message.orientation);
    }
  });

  socket.on('removeMarker', function(message) {
    _.remove($scope.markers, {id: message.id});
  });
});

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