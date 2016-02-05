/**
 * Represents a slot on the table for placement
 */

var Slot = function Slot(id) {
  this.id = id;
  this.player = null;
  this.playerPseudo = null;
  this.tag = null;
  this.color = "grey";

  this.boundaries = {left: 0, top: 0, right: 0, bottom: 0};

  this.setColor = function(color) {
    var newColor = availableColors[color];
    if(newColor) {
      this.color = color;
    }
  };

  this.setPlayer = function(player) {
    this.player = player;
    if(player === null) {
      this.playerPseudo = "";
      this.tag = null;
      this.color = "grey";
    } else if (tag !== null) {
      this.setColor(tagColors[tag]);
      return true;
    }
    return false;
  };

  this.setPlayerPseudo = function(pseudo){
    this.playerPseudo = pseudo;
  };

  this.setTag = function(tag) {
    this.tag = tag;
    if(player !== null) {
      this.setColor(tagColors[tag]);
      return true;
    }
    return false;
  };

  this.setBoundaries = function(left, top, right, bottom) {
    this.boundaries = {left: left, top: top, right: right, bottom: bottom};
  };

  this.isIn = function(x, y) {
    var b = this.boundaries;
    return (x >= b.left && x <= b.right && y >= b.top && y <= b.bottom);
  };

  this.getColorCSS = function() {
    var color = availableColors[this.color];
    return "rgba("+color[0]+","+color[1]+","+color[2]+","+color[3]+")";
  };
};