/**
 * Represents a turret on the map
 */

var Turret = function Turret(id) {
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.orientation = 0;

  this.setOrientation = function(orientation) {
    this.orientation = orientation;
  };

  this.setX = function(x) {
    this.x = x;
  };

  this.setY = function(y) {
    this.y = y;
  };
};

appTable.directive("turret", function(){
  return {
    restrict: "A",
    link: function(scope, element) {
      var context = element[0].getContext('2d');

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