/**
 * Represents the map
 */

var Map = function Map(container) {
  this.turrets = [];
  this.enemies = [];

  this.indexModel = 0;

  this.interval = undefined;
  this.container = container;

  this.addTurret = function(id, x, y, orientation) {
    var t = new Turret(id, this.container);
    t.setPosition(x, y);
    t.setOrientation(orientation);
    this.turrets.push(t);
  };

  this.addEnemy = function(id, start, positions, directions) {
    var e =  new Enemy(id, this.container);
    e.setPosition(start.x, start.y);
    e.setPoints(positions);
    e.setDirections(directions);
    this.enemies.push(e);
  };

  this.killEnemy = function(id, index) {
    var e = _.find(this.enemies, {id: id});
    e.kill(index);
  };

  this.run = function(delta) {
    var _this = this;
    this.interval = setInterval(function() {
      _.forEach(_this.enemies, function(e) {
        e.updateModel();
      });
    }, delta);
  };

  this.stop = function() {
    clearInterval(this.interval);
  };
};