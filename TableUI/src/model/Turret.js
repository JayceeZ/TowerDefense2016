/**
 * Represents a turret on the map
 */

// create a texture from an image path
var turretTexture = PIXI.Texture.fromImage('img/turret_100x120.png');
var turret2Texture = PIXI.Texture.fromImage('img/turret2_100x120.png');

var Turret = function Turret(idplayer, container) {
  this.id = idplayer;
  this.x = -200;
  this.y = -200;
  this.orientation = 0;

  this.color = getPlayerColor(idplayer);
  this.aimDistance = 0;
  this.aimArc = 0;
  this.player = idplayer;

  this.type = null;

  this.isPreview = true;
  this.isValidable = false;

  this.container = container;
  this.graphics = new PIXI.Graphics();

  this.setOrientation = function(orientation) {
    this.orientation = orientation;
    this.update();
  };

  this.setPosition = function(x,y) {
    this.x = x;
    this.y = y;
    this.update();
  };

  this.setAimZone = function(distance, arc) {
    this.aimDistance = distance;
    this.aimArc = arc;
    this.update();
  };

  this.setType = function(value) {
    switch(value) {
      case 1:
        this.sprite.texture = turretTexture;
        break;
      case 2:
        this.sprite.texture = turret2Texture;
        break;
      default:
        this.sprite.texture = turretTexture;
        break;
    }
  };

  this.validate = function(id) {
    this.id = id;
    this.isPreview = false;
    this.update();
  };

  function getPlayerColor(idplayer) {
    var ret = null;
    _.forEach(window.associations, function(association) {
      if(association.idplayer === idplayer) {
        ret = association.color;
      }
    });
    return ret;
  }

  this.__getColorHEX = function() {
    // Circle color of player
    var ret = "0xAAAAAA";
    var color = availableColors[this.color];
    if(color)
      ret = "0x"+color[0].toString(16)+color[1].toString(16)+color[2].toString(16);
    return ret;
  };

  this.__drawAimZone = function(hexColor, size, r) {
    this.graphics.lineStyle(2, 0xA5A5A5, 0.6);

    this.graphics.beginFill(hexColor, 0.4);
    this.graphics.moveTo(this.x, this.y); // center turret
    this.graphics.lineTo(this.x+Math.cos(this.orientation+r)*size, this.y+Math.sin(this.orientation+r)*size);
    this.graphics.moveTo(this.x, this.y); // center turret
    this.graphics.lineTo(this.x+Math.cos(this.orientation-r)*size, this.y+Math.sin(this.orientation-r)*size);
    this.graphics.arc(this.x, this.y, size, this.orientation-r, this.orientation+r, false);
    this.graphics.endFill();
  };

  this.update = function() {
    this.graphics.clear();

    this.graphics.lineStyle(0);

    var hexColor = this.__getColorHEX();
    this.graphics.beginFill(hexColor, 1);
    this.graphics.drawCircle(this.x, this.y, 8);
    this.graphics.endFill();

    if(!this.isValidable) {
      // Red circles for user
      this.graphics.beginFill(0xFF0000, 0.3);
      this.graphics.drawCircle(this.x, this.y, 60);
      this.graphics.endFill();
    }

    this.sprite.position.x = this.x;
    this.sprite.position.y = this.y;

    this.sprite.rotation = this.orientation+(Math.PI/2);

    if(this.isPreview && this.isValidable)
      this.__drawAimZone(hexColor, this.aimDistance, this.aimArc);
  };

  this.hide = function() {
    this.x = -200;
    this.y = -200;
    this.isValidable = false;
    this.update();
  };

  this.setValidable = function(bool) {
    this.isValidable = bool;
    this.update();
  };

  // create a new Sprite using the texture
  this.sprite = new PIXI.Sprite(turretTexture);

  // center the sprite's anchor point
  this.sprite.anchor.x = 0.5;
  this.sprite.anchor.y = 0.58;

  this.container.addChild(this.sprite);
  this.container.addChild(this.graphics);
};