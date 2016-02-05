/**
 * Represents an enemy
 */
var textures = [
  PIXI.Texture.fromImage('img/enemy1.png'),
  PIXI.Texture.fromImage('img/enemy2.png'),
  PIXI.Texture.fromImage('img/enemy3.png')
];

var eventNames = ["hp"];

var Enemy = function Enemy(id, container) {
  this.id = id;
  this.x = 0;
  this.y = 0;
  this.points = undefined;
  this.directions = undefined;
  this.dead = undefined;
  this.speed = 2;

  this.hp = 1;

  this.index = 0;
  this.events = [];

  this.currentTexture = 0;
  this.container = container;
  this.graphics = new PIXI.Graphics();

  this.setPosition = function(x,y) {
    this.x = x;
    this.y = y;
    this.update();
  };

  this.setPoints = function(points) {
    this.points = points;
  };

  this.setDirections = function(directions) {
    this.directions = directions;
  };

  this.setSpeed = function(speed) {
    this.speed = speed;
  };

  this.addEvent = function(name, time, value) {
    this.events[time] = {name: name, value: value};
  };

  this.kill = function(t) {
    console.log("Enemy " + this.id + " will die at " + t);
    this.dead = t;
  };

  this.setHp = function(value) {
    this.hp = value;
    this.update();
  };

  this.updateModel = function(t) {
    if(this.dead === t) {
      console.log("Enemy destroyed at "+t);
      this.destroy();
    }

    var eventT = this.events[t];
    if(eventT) {
      switch (eventT.name) {
        case "hp":
          console.log("Enemy "+ this.id + " have HP change "+ eventT.value);
          this.setHp(eventT.value);
          break;
        default:
          console.log("Name of event is incorrect");
          break;
      }
    }

    if(this.index < this.points.length) {
      var pos = this.points[this.index];
      var direction = this.directions[this.index];

      if (pos && direction)
        this.setPosition(this.x + this.speed * direction.vx, this.y + this.speed * direction.vy);

      if (this.x === pos.x && this.y === pos.y) {
        console.log("Objectif atteint pour " + this.id);
        console.log("position: (" + pos.x + ", " + pos.y + ")" + " direction: (" + direction.vx + ", " + direction.vy + ")");
        this.index += 1;
      }
    }
    return this.index;
  };

  this.destroy = function() {
    this.container.removeChild(this.graphics);
  };

  this.update = function() {
    this.graphics.clear();

    this.sprite.texture = textures[++this.currentTexture];
    this.sprite.position.x = this.x - this.sprite.texture.width/2;
    this.sprite.position.y = this.y - this.sprite.texture.height/2;
    if(this.currentTexture === textures.length - 1)
      this.currentTexture = 0;

    this.graphics.beginFill(0xFFFF00);

    this.graphics.lineStyle(5, 0xAAAAAA);
    this.graphics.drawRect(this.x - this.sprite.texture.width/2, this.y - this.sprite.texture.height/2, this.sprite.texture.width, 20);

    this.graphics.lineStyle(5, 0xFF0000);
    this.graphics.drawRect(this.x - this.sprite.texture.width/2, this.y - this.sprite.texture.height/2, this.sprite.texture.width * this.hp, 20);
  };

  this.sprite = new PIXI.Sprite(textures[0]);

  this.container.addChild(this.sprite);
  this.container.addChild(this.graphics);
};

