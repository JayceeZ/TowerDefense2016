/**
 * Represents the map
 */

var Map = function Map(container) {
  this.turrets = [];
  this.enemies = [];
  this.events = [];

  this.currentTime = 0;

  this.interval = undefined;
  this.container = container;

  this.addTurret = function(id, x, y, orientation) {
    var t = new Turret(id, this.container);
    t.setPosition(x, y);
    t.setOrientation(orientation);
    this.turrets.push(t);
  };

  this.addEnemy = function(id, start, positions, directions, speed) {
    var e = new Enemy(id, this.container);
    e.setPosition(start.x, start.y);
    e.setPoints(positions);
    e.setDirections(directions);
    e.setSpeed(speed);
    this.enemies.push(e);
  };

  this.killEnemy = function(id, index) {
    var e = _.find(this.enemies, {id: id});
    e.kill(index);
  };

  this.projectile = function(start, from, end, to) {
    var p = new Projectile(this.container);
    p.setDuration(end-start);
    p.setPosition(from.x, from.y);
    p.setDestination(to.x, to.y);
    this.events.push({t: start, object: p});
  };

  this.run = function(delta) {
    var _this = this;
    this.interval = setInterval(function() {
      var loopEvent = _.find(_this.events, {t: _this.currentTime});
      _.forEach(_this.enemies, function(e) {
        e.updateModel();
      });
      if(loopEvent) {
        loopEvent.object.fire();
      }
      _this.currentTime += delta;
    }, delta);
  };

  this.clean = function() {
    this.currentTime = 0;
    _.forEach(this.enemies, function(enemy) {
      enemy.destroy();
    });
    this.enemies = [];
    this.events = [];
  };

  this.stop = function() {
    clearInterval(this.interval);
  };
};