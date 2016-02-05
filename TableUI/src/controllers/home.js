/**
 * @author Jean-Christophe Isoard
 */

appTable.controller('HomeCtrl', function($scope, $location, socket) {
  $scope.goToCreate = function($event) {
    $event.preventDefault();
    $location.path('/create');
  };

  $scope.goToWatch = function($event) {
    $event.preventDefault();
    // fetch all infos of current game
    socket.emit('fetchGame');

    $location.path('/map');
  };
});