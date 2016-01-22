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
    $scope.map.addTurret(data.id, data.x, data.y, data.angle);
  });

  socket.on('initEnemy', function(data) {
    $scope.map.addEnemy(data.id, data.start, data.pathPoints, data.pathDirections, data.vitesse);
  });

  socket.on('killEnemy', function(data) {
    $scope.map.killEnemy(data.id, data.t);
  });

  socket.on('projectile', function(data) {
    $scope.map.projectile(data.start, data.from, data.end, data.to);
  });

  socket.on('launchVague', function(data) {
    $scope.map.run(33);
    $scope.message = "Vague en cours";
  });

  socket.on('endVague', function() {
    //$scope.map.stop();
    //$scope.map.clean();
    //$scope.message = "Phase de placement";
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