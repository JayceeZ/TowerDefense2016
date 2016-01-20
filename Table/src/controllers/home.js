/**
 * @author Jean-Christophe Isoard
 */

appTable.controller('HomeCtrl', function($scope, $location, socket) {
  // Template model
  $scope.slots = [];

  socket.emit('addTable');

  for(var n = 0; n < 4; n++) {
    $scope.slots.push(new Slot(n));
  }

  $scope.createGame = function() {
    console.log("Starting game");
    socket.emit('launchGame', computeAssociations());
    socket.on('gameReady', function() {
      console.log("launching game");
      startGame();
    });
  };

  /**
   * Socket updates
   */
  socket.on('addPlayer', function(message) {
    console.log("addPlayer : "+message.id+" "+message.pseudo);
    var freeSlot = getFirstFreeSlot();
    freeSlot.setPlayer(message.id);
    freeSlot.setPlayerPseudo(message.pseudo);
  });

  socket.on('updateMarker', function(message) {
    // x,y inside spot
    var home = angular.element('#home');
    var x = message.x * home[0].clientWidth;
    var y = message.y * home[0].clientHeight;
    var slot = getSlot(x, y);
    if(slot) {
      console.log("slot found");
      slot.setTag(message.id);
    }
  });

  /**
   * Controller needs
   */
  function getSlot(x, y) {
    return _.find($scope.slots, function(slot) {
      return slot.isIn(x, y);
    });
  }

  function getFirstFreeSlot() {
    return _.find($scope.slots, function(slot) {
      return slot.player === null;
    });
  }

  function computeAssociations() {
    var associations = [];
    _.forEach($scope.slots, function(slot) {
      if(slot.player && slot.color)
        associations.push({id: slot.player, color: slot.color});
    });
    return associations;
  }

  function startGame() {
    $location.path( "/map" );
  }

  socket.emit('performTestsHome');
});

appTable.directive("slot", function(){
  return {
    restrict: "A",
    link: function(scope, element) {
      var parent = angular.element(".slot")[scope.s.id].getBoundingClientRect();
      var boundaries = element[0].getBoundingClientRect();
      scope.s.setBoundaries(parent.left, boundaries.top, parent.right, boundaries.bottom);
    }
  };
});