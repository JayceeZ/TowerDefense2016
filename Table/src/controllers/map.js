/**
 * @author Jean-Christophe Isoard
 */

appTable.controller('MapCtrl', function($scope, socket) {
  // Template model
  $scope.markers = [];

  socket.emit('addTable');

  socket.on('marker', function(message) {
    if(message.x <= 1 && message.y <= 1) {
      var marker = _.find($scope.markers, {id: message.id});
      if(!marker) {
        marker = new Marker(message.id);
        $scope.markers.push(marker);
      }
      var map = angular.element('#map');
      var x = message.x * map[0].clientWidth;
      var y = message.y * map[0].clientHeight;
      marker.setX(x);
      marker.setY(y);
    }
  });
});

appTable.directive("marker", function(){
  return {
    restrict: "A",
    link: function(scope, element) {
      scope.$watch("m.x", function(newValue, oldValue) {
        setLeft(newValue);
      });

      scope.$watch("m.y", function(newValue, oldValue) {
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