
appTable.controller('markersCtrl',  function($scope, socket) {
  $scope.markers = [];

  socket.on('updateMarker', function(message) {
    if(message.x <= 1 && message.y <= 1) {
      var marker = _.find($scope.markers, {id: message.id});
      if(!marker) {
        marker = new Marker(message.id);
        $scope.markers.push(marker);
      }
      var viewport = angular.element('#viewport');
      var x = message.x * viewport[0].clientWidth;
      var y = message.y * viewport[0].clientHeight;
      marker.setX(x);
      marker.setY(y);
      marker.setOrientation(message.angle);
    }
  });

  socket.on('removeMarker', function(id) {
    console.log("Removed "+id);
    _.remove($scope.markers, {id: id});
  });
});