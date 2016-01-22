/**
 * Created by salahbennour on 21/01/2016.
 */


'use strict';

angular.module('details.controllers', ['socket.service', 'config.service'])

.controller('DetailsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, RESOURCES, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

  //** HEADER
  /**=========================**/
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = true;
  $scope.$parent.setExpanded(true);
  $scope.$parent.setHeaderFab('left');


  //** Scopes
  /**=========================**/
  $scope.id = $stateParams.idDefense;
  $scope.defense = '';
  $scope.buttonNavigation ={
    "description" : true,
    "caracteristics" : false
  };


  //** Get a defense
  /**=========================**/
  $scope.getDefense = function() {
    var l = RESOURCES.defenses;
    for(var i=0 ; i < l.length ; i++){
      if(l[i].id == $scope.id){
        $scope.defense = l[i];
        break;
      }
    }
  };


  //** Navigation buttons
  /**=========================**/
  $scope.infos = function(id) {
    if(id == 0) {
      $scope.buttonNavigation.description = true;
      $scope.buttonNavigation.caracteristics = false;
    }else{
      $scope.buttonNavigation.description = false;
      $scope.buttonNavigation.caracteristics = true;
    }
  };

});
