/**
 * Represents a slot on the table for placement
 */

var Slot = function Slot(id) {
  var tagColors = ["red", "blue", "green", "purple"];
  var availableColors = {
    grey: [0, 0, 0, 0.2],
    orange: [255,120,50,1],
    yellow: [253,214,0,1],
    green: [140,210,17,1],
    cyan: [0,180,160,1],
    blue: [85,150,230,1],
    purple: [152,85,212,1],
    pink: [255,60,160,1],
    red: [231,29,50,1]
  };

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
  };

  this.setPlayerPseudo = function(pseudo){
    this.playerPseudo = pseudo;
  }

  this.setTag = function(tag) {
    if(this.player) {
      this.tag = tag;
      this.setColor(tagColors[this.id]);
    }
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