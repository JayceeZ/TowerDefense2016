


appTable.controller('markersCtrl',  function($scope) {
  $scope.markers = [];

  socket.on('updateMarker', function(message) {
    if(message.x <= 1 && message.y <= 1) {
      var marker = _.find($scope.markers, {id: message.id});
      if(!marker) {
        marker = new Marker(message.id);
        $scope.markers.push(marker);
      }
      var map = angular.element('#map');
      var x = message.x * map[0].clientWidth;
      var y = message.y * map[0].clientHeight;
      marker.setX(x);
      marker.setY(y);
      marker.setOrientation(message.orientation);
    }
  });

  socket.on('removeMarker', function(message) {
    _.remove($scope.markers, {id: message.id});
  });
});