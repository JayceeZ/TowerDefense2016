/**
 * @author Jean-Christophe Isoard
 */

var socketio = require('socket.io');

/**
 * Sockets API
 */
var ioServer = socketio(8081);

/**
 * Add
 */

var res = {width: 1920, height: 1080};

ioServer.on('connection', function (socket) {
  socket.on('addTable', function (message) {
    console.log('Table authentified');
    socket.join('table');
  });

  socket.on('performTestsHome', function () {
    console.log('Simulate users authentication');
    socket.emit('addPlayer', {id: "User1", pseudo: "Charle"});
    socket.emit('addPlayer', {id: "User2", pseudo: "Jhon"});
    socket.emit('addPlayer', {id: "User3", pseudo: "Francky le boss"});
    socket.emit('addPlayer', {id: "User4", pseudo: "Le géant du samedi qui reprends du kiwi à chaque repas"});

    setTimeout(function() {
      socket.emit('removePlayer', "User3");
      socket.emit('removePlayer', "User4");
    }, 2000);

    console.log('Pose of pieces');
    socket.emit('updateMarker', {id: "A6", x: 400 / res.width, y: 700 / res.height, angle: 0});
    socket.emit('updateMarker', {id: "20", x: 500 / res.width, y: 700 / res.height, angle: 0});
    socket.emit('removeMarker', {id: "A6"});
    //socket.emit('updateMarker', {id: "A3", x: 1400 / res.width, y: 700 / res.height, angle: 0});
    socket.emit('updateMarker', {id: "A4", x: 1100 / res.width, y: 700 / res.height, angle: 0});
    socket.emit('updateMarker', {id: "A6", x: 720 / res.width, y: 700 / res.height, angle: 0});
  });

  socket.on('launchGame', function (message) {
    message.forEach(function (e) {
      console.log('Player ' + e.player + ' ' + e.slot);
    });
    socket.emit('gameReady');
  });

  socket.on('performTestsMap', function () {
    console.log('Tests Map');

    socket.emit('updateMarker', {id: "20", x: 720 / res.width, y: 480 / res.height, angle: 0});
    var r = 0;
    var timerId1 = setInterval(function () {
      r += 0.3;
      console.log('Rotate A1 ' + (r));
      socket.emit('updateMarker', {id: "20", x: 720 / res.width, y: 480 / res.height, angle: r});
      if(r > 4) {
        console.log("Turret fire");
        socket.emit('validateTower', {idplayer: "User1", id: 1, x: 720, y: 480, angle: r});
        clearInterval(timerId1);
      }
    }, 100);
    var timerId2 = setInterval(function () {
      r += 0.3;
      console.log('Rotate A2 ' + (r));
      socket.emit('updateMarker', {id: "A6", x: 200 / res.height, y: 200 / res.height, angle: r});
      if(r > 2) {
        console.log("Turret fire");
        socket.emit('validateTower', {idplayer: "User2", id: 0, x: 200, y: 200 , angle: r, type: "First"});
        clearInterval(timerId2);
      }
    }, 100);


    socket.emit('initEnemy', {id: 0, start: {x: 0, y: 400}, pathPoints: [{x: 100, y: 400},{x: 200, y: 140000},{x: 700, y: 400}], pathDirections: [{vx: 1, vy: 0}, {vx: 1, vy: 0}, {vx: 1, vy: 0}], vitesse: 2});
    socket.emit('initEnemy', {id: 0, start: {x: 0, y: 450}, pathPoints: [{x: 50, y: 450},{x: 200, y: 450},{x: 1000, y: 450}], pathDirections: [{vx: 1, vy: 0}, {vx: 1, vy: 0}, {vx: 1, vy: 0}], vitesse: 2});

    socket.emit('launchVague', {delta: 30});
    socket.emit('killEnemy', {id: 0, t: 10*30});

    socket.emit('projectile', {start: 120, from: {x: 200, y: 200}, end: 30, to: {x: 300, y: 100}});


    console.log('End vague');
    socket.emit('endVague', 15*30);


    socket.emit('endGame');
  });

});