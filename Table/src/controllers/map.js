/**
 * @author Jean-Christophe Isoard
 */

appTable.controller('MapCtrl', function($scope, socket) {
  // Template model
  $scope.message = "Phase de placement";

  /*******************
   * Animation setup *
   *******************/
  var map = angular.element("#map")[0];
  var renderer = PIXI.autoDetectRenderer(map.clientWidth, map.clientHeight, {transparent: true, antialiasing: true});
  map.appendChild(renderer.view);
  var container = new PIXI.Container();

  function animate() {
    renderer.render(container);
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  /***********
   * Objects *
   ***********/
  $scope.map = new Map(container);

  socket.on('validateTower', function(data) {
    $scope.map.addTurret(data.id, data.x, data.y, data.orientation);
  });

  socket.on('initEnemy', function(data) {
    $scope.map.addEnemy(data.id, data.startPoint, data.pathPoints, data.pathDirections);
  });

  socket.on('killEnemy', function(data) {
    $scope.map.killEnemy(data.id, data.index);
  });

  socket.on('projectile', function(data) {
    $scope.map.projectile(data.start, data.from, data.end, data.to);
  });

  socket.on('launchVague', function(data) {
    $scope.map.run(data.delta);
    $scope.message = "Vague en cours";
  });

  socket.on('cleanMap', function(data) {
    $scope.map.stop();
    $scope.map.clean();
    $scope.message = "Phase de placement";
  });

  socket.emit('performTestsMap');
});

appTable.directive("message", function() {
  return {
    restrict: "A",
    link: function(scope, element) {
      scope.$watch("message", function(newValue, oldValue) {
        element[0].content = newValue;
      });
    }
  };
});