/**
 * Created by salahbennour on 21/01/2016.
 */

'use strict';

angular.module('placement.controllers', ['socket.service', 'config.service'])

.controller('PlacementCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, RESOURCES, socket, $ionicLoading, $state) {

  //** HEADER
  /**=========================**/
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.$parent.setHeaderFab('left');
  $scope.isExpanded = true;
  $scope.$parent.setExpanded(true);

  //** Scopes
  /**=========================**/
  $scope.defenses = RESOURCES.defenses;
  $scope.selectedItem = -1;
  $scope.valid = false;
  $scope.finish = true;


  socketEvents();


  //** Select a defense
  /**=========================**/
  $scope.onDoubleTap = function(id) {
    $scope.selectedItem = id;
  };

  $scope.disableSelection = function() {
    $scope.selectedItem = -1;
  };


  //** Valid placement
  /**=========================**/
  $scope.validIt = function() {
    socket.emit("putTower");
    $scope.valid = false;
  };

  $scope.canValid = function() {
    return ($scope.valid && ($scope.selectedItem != -1));
  };


  //** Ready to play
  /**=========================**/
  $scope.ready = function () {
    socket.emit("isReady", true);
    $scope.finish = false;
    showLoading();

  };

  $scope.redo = function () {
    socket.emit("isReady", false);
    //$scope.finish = true;
  };


  //** SOCKET ON
  /**=========================**/
  function socketEvents() {
    socket.on('checkPlacement', function (data) {
      if(data === true && $scope.selectedItem !== -1) {
          $scope.valid = true;
      }else{
        $scope.valid = false;
      }
    });


    socket.on('launchVague', function (data) {
      $ionicLoading.hide();
      $state.go('app.timer');
    });

  };


  //** Show loading
  /**=========================**/
  function showLoading() {
    $ionicLoading.show({
      template: '<h4>Ready ! Wait others players</h4></div><ion-spinner icon="bubbles" class="spinner-assertive"></ion-spinner>',
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 0
    });
  }


});
