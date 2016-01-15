/**
 * Represents a marker on the table for placement
 */

function Marker() {
  this.position = {x: 0, y: 0}; // Coordinates on the table
  this.orientation = 0; // Angle of rotation from original

  this.setOrientation = function(orientation) {
    this.orientation = orientation;
  }

  this.setX = function(x) {
    this.position.x = x;
  }

  this.setY = function(y) {
    this.position.y = y;
  }
}