/**
 * Represents the map
 */

var Map = function Map(scope, container) {
  this.turrets = [];
  this.enemies = [];
  this.events = [];
  this.message = "Phase de placement";

  this.currentTime = 0; // number of cycles of delta passed
  this.end = null;
  this.lastVague = false;

  this.width = 1920;
  this.height = 1080;

  // Scope of Ctrl for textual updates
  this.scope = scope;

  this.interval = undefined;
  this.graphics = new PIXI.Graphics();
  this.container = container;

  this.validateTurret = function(idplayer, id, x, y, angle) {
    _.forEach(this.turrets, function(turret) {
      if(turret.id === idplayer && turret.isPreview) {
        console.log("Turret placed at ("+x+","+y+") for player "+idplayer);
        turret.setPosition(x, y);
        turret.setOrientation(angle);
        turret.validate(id);
      }
    });
  };

  this.previewPlacingTurret = function(idplayer, x, y, angle, placementOk) {
    var _this = this;
    _.forEach(this.turrets, function(turret) {
      if(turret.id === idplayer && turret.isPreview) {
        turret.setPosition(x * _this.width, y * _this.height);
        turret.setOrientation(angle);
        turret.setValidable(placementOk);
      }
    });
  };

  this.setPlayerTurretSpecs = function(idplayer, type, aimZone) {
    var turret = _.find(this.turrets, {player: idplayer, isPreview: true});
    if(!turret) {
      turret = new Turret(idplayer, this.container);
      console.log("Turret created for preview");
      this.turrets.push(turret);
    }
    var marker = _.find(this.scope.markers, {player: idplayer});
    if(marker) {
      console.log("at ("+turret.x+","+turret.y+")");
      turret.setPosition(marker.x, marker.y);
      turret.setOrientation(marker.orientation);
    }
    turret.setAimZone(aimZone.distance, aimZone.arc);
    turret.setType(type);
  };

  this.removePlacingTurret = function(idplayer) {
    _.forEach(this.turrets, function(turret) {
      if(turret.id === idplayer && turret.isPreview) {
        turret.hide();
        console.log("Hiding turret");
      }
    });
  };

  this.addEnemy = function(id, start, positions, directions, speed) {
    var e = new Enemy(id, this.container);
    e.setPosition(start.x, start.y);
    e.setPoints(positions);
    e.setDirections(directions);
    e.setSpeed(speed);
    this.enemies.push(e);
  };

  this.updateEnemyHp = function(id, time, hp) {
    var enemy = _.find(this.enemies, {id: id});
    if(enemy)
      enemy.addEvent("hp", time, hp);
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
    if((this.interval || null) !== null)
      return;
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
      if(_this.end != null && _this.currentTime >= _this.end) {
        _this.stop();
        _this.clean();
      }
    }, delta);
    this.message = "Vague en cours";
  };

  this.jumpTo = function(time) {
    this.currentTime = time;
  };

  this.clean = function() {
    this.currentTime = 0;
    _.forEach(this.enemies, function(enemy) {
      enemy.destroy();
    });
    this.enemies = [];
    this.events = [];
    var _this = this;
    this.scope.$apply(function() {
      _this.message = "Phase de placement";
    });
  };

  this.stop = function() {
    clearInterval(this.interval);
    this.interval = null;
    console.log('Map animation stopped');
  };

  this.isEndGame = function() {
    if (this.interval === null && this.lastVague === true) {
      var _this = this;
      this.scope.$apply(function() {
        _this.message = "Fin de partie";
        var replay = document.getElementById("replay-button");
        if(replay)
          replay.style = "display: block;";
      });
      return true;
    }
    return false;
  };

  this.drawEdges = function() {
    this.graphics.lineStyle(2, 0x0000FF, 1);
    this.graphics.moveTo(0, 300);
    this.graphics.lineTo(1920, 300);
    this.graphics.moveTo(0, 700);
    this.graphics.lineTo(1920, 700);
  };

  //this.drawEdges();
  container.addChild(this.graphics);
};