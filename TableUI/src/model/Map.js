/**
 * Represents the map
 */

var Map = function Map(container) {
  this.turrets = [];
  this.enemies = [];
  this.events = [];
  this.message = "Phase de placement";

  this.currentTime = 0;
  this.end = 0;

  this.interval = undefined;
  this.graphics = new PIXI.Graphics();
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

  this.killEnemy = function(id, t) {
    var e = _.find(this.enemies, {id: id});
    e.kill(t);
  };

  this.projectile = function(start, from, end, to) {
    var p = new Projectile(this.container);
    p.setDuration(end-start);
    p.setPosition(from.x, from.y);
    p.setDestination(to.x, to.y);
    if(this.events[start])
      this.events[start].push(p);
    else
      this.events[start] = [p];
    console.log("Projectile scheduled at "+start);
  };

  this.run = function(delta) {
    var _this = this;
    var loopEvents;
    this.interval = setInterval(function() {
      loopEvents = _this.events[_this.currentTime];
      for(var i=0; i < _this.enemies.length; i++) {
        _this.enemies[i].updateModel(_this.currentTime);
      }
      if(loopEvents && loopEvents.length) {
        console.log("Events at "+_this.currentTime);
        for(var i=0; i < loopEvents.length; i++) {
          loopEvents[i].fire(delta);
        }
      }
      _this.currentTime++;
      if(_this.currentTime === _this.end) {
        _this.stop();
        _this.clean();
      }
    }, delta);
    this.message = "Vague en cours";
  };

  this.clean = function() {
    this.currentTime = 0;
    _.forEach(this.enemies, function(enemy) {
      enemy.destroy();
    });
    this.enemies = [];
    this.events = [];
    this.message = "Phase de placement";
  };

  this.stop = function() {
    clearInterval(this.interval);
  };

  this.drawEdges = function() {
    this.graphics.lineStyle(2, 0x0000FF, 1);
    this.graphics.moveTo(0, 300);
    this.graphics.lineTo(1920, 300);
    this.graphics.moveTo(0, 700);
    this.graphics.lineTo(1920, 700);
  };

  this.drawEdges();
  container.addChild(this.graphics);
};