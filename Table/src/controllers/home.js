/**
 * Jean-Christophe Isoard
 */

appTable.controller('HomeCtrl', function($scope, socket) {
  $scope.hello = "hello";

  $scope.slots = [];

  $scope.slots.push(new Slot(0));
  $scope.slots.push(new Slot(1));
  $scope.slots.push(new Slot(2));
  $scope.slots.push(new Slot(3));

  $scope.validate = function() {
    // Validate players and go to map
  }
});

appTable.directive("slot", function(){
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