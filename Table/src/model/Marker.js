/**
 * Represents a marker on the table for placement
 */

var Marker = function Marker(id) {

  this.id = id;
  this.x = 0;
  this.y = 0;
  this.orientation = 0; // Angle of rotation from original

  this.setOrientation = function(orientation) {
    this.orientation = orientation % (Math.PI*2);
  };

  this.setX = function(x) {
    this.x = x;
  };

  this.setY = function(y) {
    this.y = y;
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

      function getColorHEX() {
        var color = availableColors[tagColors[scope.m.id]];
        return "#" + color[0].toString(16) + color[1].toString(16) + color[2].toString(16);
      }

      function draw(size){
        context.clearRect(0,0,size,size);
        context.beginPath();
        context.lineWidth = 5;
        context.arc(size/2, size/2, size/2 - context.lineWidth, 0, scope.m.orientation, false);
        context.lineTo(size/2, size/2);
        context.arc(size/2, size/2, size/2 - context.lineWidth, scope.m.orientation, Math.PI*2, false);
        context.strokeStyle = '#003300';
        context.stroke();
      }
    }
  };
});