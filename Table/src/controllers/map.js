/**
 * @author Jean-Christophe Isoard
 */

var appTable = angular.module('appTable',[]);

var mapCtrl = appTable.controller("MapCtrl", function($scope) {
  // Template model
  $scope.markers = [];

  var socket = io.connect("http://192.168.1.21:8081");

  socket.emit('addTable');

  socket.on('marker', function(message) {
    var marker = _.find($scope.markers, {id: message.id});
    if(!marker)
      $scope.markers.push(new Marker(message.id));
    marker.setX(message.x);
    marker.setY(message.y);
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

      draw(parseInt(element[0].clientWidth));

      function setLeft(left) {
        element[0].style.left = left+"px";
      }

      function setTop(top) {
        element[0].style.top = top+"px";
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