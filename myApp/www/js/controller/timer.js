/* global angular, document, window */
'use strict';

angular.module('timer.controllers', ['socket.service', 'config.service'])


  .controller('TimerCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $state) {

    $timeout(function() {
      $scope.$parent.hideHeader();
    }, 0);

    $scope.countDown = 5;
    var timer = setInterval(function(){
      $scope.countDown--;
      $scope.$apply();
      if($scope.countDown == 0) {
        $state.go('app.stats');
      }
    }, 1000);

  });
