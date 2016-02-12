/**
 * @author Jean-Christophe Isoard
 */

appTable.controller('MapCtrl', function($scope, socket) {
  /*******************
   * Animation setup *
   *******************/
  var map = angular.element("#map")[0];
  var renderer = PIXI.autoDetectRenderer(map.clientWidth, map.clientHeight, {transparent: true, antialiasing: false});
  map.appendChild(renderer.view);
  var container = new PIXI.Container();

  function animate() {
    renderer.render(container);
    if(!$scope.map.isEndGame())
      requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  /***********
   * Objects *
   ***********/
  $scope.map = new Map($scope, container);

  socket.on('validateTower', function(data) {
    // Tower preview validated
    $scope.map.validateTurret(data.playerId, data.id, data.x, data.y, data.angle);
  });

  socket.on('updateMarker', function(data) {
    $scope.map.previewPlacingTurret(data.playerId, data.x, data.y, data.angle, data.positionOk);
  });

  socket.on('removeMarker', function(data) {
    $scope.map.removePlacingTurret(data.playerId);
  });

  socket.on('playerSelectTower', function(data) {
    $scope.map.setPlayerTurretSpecs(data.playerId, data.type, data.preview);
  });

  socket.on('initEnemy', function(data) {
    $scope.map.addEnemy(data.id, data.start, data.pathPoints, data.pathDirections, data.vitesse);
  });

  socket.on('updateEnemyHp', function(data) {
    $scope.map.updateEnemyHp(data.id, data.t, data.hp);
  });

  socket.on('killEnemy', function(data) {
    $scope.map.killEnemy(data.id, data.t);
  });

  socket.on('projectile', function(data) {
    $scope.map.projectile(data.start, data.from, data.end, data.to);
  });

  socket.on('launchVague', function(data) {
    $scope.map.run(33);
  });

  socket.on('endVague', function(t) {
    $scope.map.end = t;
  });

  socket.on('endGame', function() {
    $scope.map.lastVague = true;
  });

  /**********************
   * Fetch for observer *
   **********************/

  socket.on('gameData', function(data) {
    var map = $scope.map;

    // Players association
    var associations = [];
    _.forEach(data.players, function(player) {
      associations.push({idplayer: slot.player, idtag: slot.tag, color: slot.color});
    });
    window.associations = associations;

    // Build turrets
    _.forEach(data.turrets, function(turret) {
      map.setPlayerTurretSpecs(idplayer, type, aimZone);
      map.validateTurret(idplayer, id, x, y, angle);
    }, this);

    // Enemies
    _.forEach(data.enemies, function(turret) {
      map.addEnemy(id,start,positions,directions,speed);
    }, this);

    map.run(data.delta);
    map.jumpTo(time);
  });

  /**
   * Route back to create
   */
  $scope.goToCreate = function($event) {
    $event.preventDefault();
    $location.path('/create');
  };

  socket.emit('performTestsMap');
});

appTable.directive("message", function() {
  return {
    restrict: "A",
    link: function(scope, element) {
      scope.$watch("map.message", function(newValue, oldValue) {
        element[0].content = newValue;
      });
    }
  };
});