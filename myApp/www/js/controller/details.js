/**
 * Created by salahbennour on 21/01/2016.
 */

'use strict';

angular.module('details.controllers', ['socket.service', 'config.service'])

.controller('DetailsCtrl', function($scope,$rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, RESOURCES, $ionicSlideBoxDelegate, $ionicScrollDelegate, $ionicHistory) {

  //** HEADER
  /**=========================**/
  $scope.$parent.showHeader();
  $scope.isExpanded = true;
  $scope.$parent.setExpanded(true);


  //** Scopes
  /**=========================**/
  $scope.id = $stateParams.idDefense;
  $scope.description = true;
  $scope.defense = [];


  //** Get a defense
  /**=========================**/
  $scope.getDefense = function() {
    var l = $rootScope.myDefenses;
    for(var i=0 ; i < l.length ; i++){
      if(l[i].id == $scope.id){
        $scope.defense = l[i];
        break;
      }
    }
  };


  //** Navigation buttons
  /**=========================**/
  $scope.setDescription = function(val) {
    if(val) {
      $scope.description = true;
    }else{
      $scope.description = false;
    }
  };

    //** Disable back
    /**=========================**/
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: false
    });

});
