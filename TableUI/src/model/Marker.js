/**
 * Represents a marker on the table for placement
 */

var Marker = function Marker(id) {
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.orientation = 0; // Angle of rotation from original
  this.player = null;

  this.setOrientation = function(orientation) {
    this.orientation = orientation % (Math.PI*2);
  };

  this.setX = function(x) {
    this.x = x;
  };

  this.setY = function(y) {
    this.y = y;
  };

  this.setPlayer = function(playerId) {
    this.player = playerId;
  };
};

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

      scope.$watch("m.orientation", function(newValue, oldValue) {
        draw(parseInt(element[0].clientWidth));
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
        context.clearRect(0,0,size,size);
        // circle with color
        context.beginPath();
        context.lineWidth = 5;
        context.arc(size/2, size/2, size/2 - context.lineWidth, 0, scope.m.orientation, false);
        context.lineTo(size/2, size/2);
        context.arc(size/2, size/2, size/2 - context.lineWidth, scope.m.orientation, Math.PI*2, false);
        context.strokeStyle = getColorHEX(scope.m.id);
        context.stroke();
        // circle black thinner
        context.beginPath();
        context.lineWidth = 2;
        context.arc(size/2, size/2, size/2 - 3, 0, scope.m.orientation, false);
        context.lineTo(size/2, size/2);
        context.arc(size/2, size/2, size/2 - 3, scope.m.orientation, Math.PI*2, false);
        context.strokeStyle = "#000000";
        context.stroke();
      }
    }
  };
});