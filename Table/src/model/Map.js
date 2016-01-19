/**
 * Represents the map
 */

var Map = function Map() {
  this.turrets = [];
  this.boundaries = new ClientRect();

  this.addTurret = function(turret) {
    this.turrets.push(turret);
  };
};