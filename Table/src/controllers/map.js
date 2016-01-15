/**
 * @author Jean-Christophe Isoard
 */

var appTable = angular.module('appTable',[]);

appTable.factory('socket', function ($rootScope) {
  var socket = io.connect("http://192.168.1.21:8081");
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

var mapCtrl = appTable.controller("MapCtrl", function($scope, socket) {
  // Template model
  $scope.markers = [];

  socket.emit('addTable');

  socket.on('marker', function(message) {
    var marker = _.find($scope.markers, {id: message.id});
    if(!marker) {
      marker = new Marker(message.id);
      $scope.markers.push(marker);
    }
    var x = message.x*1920;
    var y = message.y*1080;
    marker.setX(x);
    marker.setY(y);
  });
});

mapCtrl.directive("marker", function(){
  return {
    restrict: "A",
    link: function(scope, element) {
      scope.$watch("m.x", function(newValue, oldValue) {
        //This gets called when data changes.
        setLeft(newValue);
      });

      scope.$watch("m.y", function(newValue, oldValue) {
        //This gets called when data changes.
        setTop(newValue);
      });

      var context = element[0].getContext('2d');

      element[0].width = parseInt(element[0].clientWidth);
      element[0].height = parseInt(element[0].clientHeight);

      var size = parseInt(element[0].clientWidth);
      draw(size);

      function setLeft(left) {
        element[0].style.left = (left-size/2)+"px";
      }

      function setTop(top) {
        element[0].style.top = (top-size/2)+"px";
      }

      function draw(size){
        context.beginPath();
        context.lineWidth = 5;
        context.arc(size/2, size/2, size/2 - context.lineWidth, 0, 2 * Math.PI, false);
        context.strokeStyle = '#003300';
        context.stroke();
      }
    }
  };
});