/**
 * Represents the map
 */

var Map = function Map(container) {
  this.turrets = [];
  this.enemies = [];

  this.indexModel = 0;

  this.interval = undefined;
  this.container = container;

  this.addTurret = function(x, y, orientation) {
    var t = new Turret(this.turrets.length, this.container);
    t.setPosition(x, y);
    t.setOrientation(orientation);
    this.turrets.push(t);
  };

  this.addEnemy = function(id, x, y, points, directions) {
    var e =  new Enemy(id, this.container);
    e.setPosition(x, y);
    e.setPoints(points);
    e.setDirections(directions);
    this.enemies.push(e);
  };

  this.killEnemy = function(id, index) {
    var e = _.find(this.enemies, {id: id});
    e.kill(index);
  };

  this.run = function() {
    var _this = this;
    this.interval = setInterval(function() {
      _.forEach(_this.enemies, function() {
        e.update(_this.indexModel);
      });
    }, 100);
  };

  this.stop = function() {
    clearInterval(this.interval);
  };
};