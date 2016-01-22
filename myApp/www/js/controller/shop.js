/* global angular, document, window */
'use strict';

angular.module('st.controllers', ['socket.service', 'config.service'])


  .controller('ShopCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $state, RESOURCES, $ionicPopup) {

    //** HEADER
    /**=========================**/
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);



    //** Scope
    /**=========================**/
    $scope.defenses = RESOURCES.defenses;


    //** Popup
    /**=========================**/
    $scope.showConfirm = function (name) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Acheter : ' +name,
        template: 'Êtes-vous sûr de vouloir faire cet achat ?',
        cancelText: 'Non',
        okText: "Oui"
      });

      confirmPopup.then(function (res) {
        if (res) {}
      });
    };


    //** Details
    /**=========================**/
    $scope.details = function(id) {
      $state.go('app.details', {'idDefense': id});
    };

    $scope.$on('ngLastRepeat.mylist',function(e) {
      ionicMaterialInk.displayEffect();
    });

    ionicMaterialMotion.pushDown({
      selector: '.push-down'
    });

  });
