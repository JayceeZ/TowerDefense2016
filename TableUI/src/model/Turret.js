/**
 * Represents a turret on the map
 */

// create a texture from an image path
var turretTexture = PIXI.Texture.fromImage('img/turret_100x120.png');

var Turret = function Turret(idplayer, container) {
  this.id = idplayer;
  this.x = 0;
  this.y = 0;
  this.orientation = 0;

  this.color = getPlayerColor(idplayer);
  this.aimDistance = 0;
  this.aimArc = 0;
  this.player = idplayer;

  this.isPreview = true;
  this.isHidden = true;

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
    this.graphics.arc(this.x, this.y, size*2, this.orientation-r, this.orientation+r, false);
    this.graphics.endFill();
  };

  this.update = function() {
    this.graphics.clear();

    this.graphics.lineStyle(0);

    var hexColor = this.__getColorHEX();
    this.graphics.beginFill(hexColor, 1);
    this.graphics.drawCircle(this.x, this.y, 8);
    this.graphics.endFill();

    this.texture.position.x = this.x;
    this.texture.position.y = this.y;

    this.texture.rotation = this.orientation+(Math.PI/2);

    if(this.isPreview)
      this.__drawAimZone(hexColor, this.aimDistance, this.aimArc);
  };

  this.hide = function() {
    if(!this.isHidden)
      return;
    console.log("Turret "+this.id+" hidden "+this.isPreview);
    this.container.removeChild(this.texture);
    this.container.removeChild(this.graphics);
    this.isHidden = true;
  };

  this.show = function() {
    if(this.isHidden)
      return;
    console.log("Turret "+this.id+" visible "+this.isPreview);
    this.container.addChild(this.texture);
    this.container.addChild(this.graphics);
    this.isHidden = false;
  };

  // create a new Sprite using the texture
  this.texture = new PIXI.Sprite(turretTexture);

  // center the sprite's anchor point
  this.texture.anchor.x = 0.5;
  this.texture.anchor.y = 0.58;
};