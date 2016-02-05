/**
 * @author Jean-Christophe Isoard
 */

appTable.controller('CreateCtrl', function($scope, $location, socket) {
  // Template model
  $scope.slots = [];

  for (var n = 0; n < 4; n++) {
    $scope.slots.push(new Slot(n));
  }

  $scope.createGame = function($event) {
    $event.preventDefault();
    if($scope.allPlayersAssociated()) {
      console.log("Create game button pressed");
      socket.emit('launchGame', computeAssociations());
      socket.on('gameReady', function() {
        console.log("launching game");
        startGame();
      });
    }
  };

  $scope.allPlayersAssociated = function() {
    var ret = true;
    _.forEach($scope.slots, function(slot) {
      if (slot.player !== null) {
        if (slot.tag === null)
          ret = false;
      }
    });
    return ret;
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

  socket.on('removePlayer', function(id) {
    console.log("removePlayer : "+id);
    _.forEach($scope.slots, function(slot) {
      if(slot.player === id) {
        slot.setPlayer(null);
      }
    });
  });

  socket.on('updateMarker', function(message) {
    // x,y inside spot
    var home = angular.element('#home');
    if(home[0]) {
      var x = message.x * home[0].clientWidth;
      var y = message.y * home[0].clientHeight;
      var slot = getSlot(x, y);
      // Only if a player is connected in the slot
      if (slot && slot !== null && slot.player !== null) {
        slot.setTag(message.id);
        socket.emit('playerColorUpdate', {id: slot.player, pseudo: slot.playerPseudo, color: slot.color});
      }
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
      if(slot.player !== null && slot.tag !== null)
        associations.push({idplayer: slot.player, idtag: slot.tag, color: slot.color});
    });
    window.associations = associations;
    return associations;
  }

  function startGame() {
    $location.path("/map");
  }

  socket.emit('performTestsHome');
});

appTable.directive("slot", function() {
  return {
    restrict: "A",
    link: function(scope, element) {
      var parent = angular.element(".slot")[scope.s.id].getBoundingClientRect();
      var boundaries = element[0].getBoundingClientRect();
      scope.s.setBoundaries(parent.left, boundaries.top, parent.right, boundaries.bottom);
    }
  };
});