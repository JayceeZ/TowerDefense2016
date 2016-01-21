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
    requestAnimationFrame( animate );
  }
  requestAnimationFrame(animate);

  /***********
   * Objects *
   ***********/
  var e = new Enemy();
  container.addChild(e.graphics);
  e.update();

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