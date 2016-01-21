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
  var renderer = PIXI.autoDetectRenderer(map.clientWidth, map.clientHeight, {transparent: true});
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
    $scope.map.addTurret(data.x*map.clientWidth, data.y*map.clientHeight, data.orientation);
  });

  socket.on('initEnemy', function(data) {
    $scope.map.addEnemy(data.id, data.startPoint.x, data.startPoint.y, data.pathPoints, data.pathDirections);
  });

  socket.on('turret', function(message) {
    var t = _.find($scope.map.turrets, {id: message.id});
    if(t && message.fire)
      t.fire();
  });

  socket.on('launchVague', function(data) {
    $scope.map.run();
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