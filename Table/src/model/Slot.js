/**
 * Represents a slot on the table for placement
 */

var Slot = function Slot(id) {
  this.id = id;
  this.x = 0;
  this.y = 0;

  this.setX = function(x) {
    this.x = x;
  };

  this.setY = function(y) {
    this.y = y;
  };
};