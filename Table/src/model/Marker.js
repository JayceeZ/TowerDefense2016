/**
 * Represents a marker on the table for placement
 */

var Marker = function Marker(id) {
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.orientation = 0; // Angle of rotation from original

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