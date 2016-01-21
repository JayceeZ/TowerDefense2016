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

ioServer.on('connection', function (socket) {
  socket.on('addTable', function (message) {
    console.log('Table authentified');
    socket.join('table');
  });

  socket.on('performTestsHome', function () {
    console.log('Simulate users authentication');
    socket.emit('player', {id: "User1"});
    socket.emit('player', {id: "User2"});
    socket.emit('player', {id: "User3"});
    socket.emit('player', {id: "User4"});

    console.log('Pose of pieces');
    var res = {width: 1920, height: 1080};
    socket.emit('updateMarker', {id: "A1", x: 720 / res.width, y: 480 / res.height, orientation: 0});
    socket.emit('updateMarker', {id: "A2", x: 850 / res.width, y: 480 / res.height, orientation: 0});
    socket.emit('removeMarker', {id: "A1"});
    socket.emit('updateMarker', {id: "A3", x: 980 / res.width, y: 480 / res.height, orientation: 0});
    socket.emit('updateMarker', {id: "A4", x: 1180 / res.width, y: 480 / res.height, orientation: 0});
    socket.emit('updateMarker', {id: "A1", x: 720 / res.width, y: 480 / res.height, orientation: 0});
  });

  socket.on('players', function (message) {
    message.forEach(function (e) {
      console.log('Player ' + e.id + ' ' + e.color);
    });
    socket.emit('gameReady');
  });

  socket.on('performTestsMap', function () {
    console.log('Tests Map');

    socket.emit('updateMarker', {id: "A1", x: 720 / 1920, y: 480 / 1080, orientation: 0});
    var r = 0;
    var timerId1 = setInterval(function () {
      r += 0.3;
      console.log('Rotate A1 ' + (r));
      socket.emit('updateMarker', {id: "A1", x: 720 / 1920, y: 480 / 1080, orientation: r});
      if(r > 4)
        clearInterval(timerId1);
    }, 100);
    var timerId2 = setInterval(function () {
      r += 0.3;
      console.log('Rotate A2 ' + (r));
      socket.emit('updateMarker', {id: "A2", x: 200 / 1920, y: 800 / 1080, orientation: r});
      if(r > 2)
        clearInterval(timerId2);
    }, 100);
  });

});