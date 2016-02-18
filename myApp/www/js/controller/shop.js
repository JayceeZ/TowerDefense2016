/* global angular, document, window */
'use strict';

angular.module('st.controllers', ['socket.service', 'config.service'])


  .controller('ShopCtrl', function($scope,$rootScope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $state, RESOURCES, $ionicPopup,$ionicHistory) {

    //** Nav bar color
    /**=========================**/
    $scope.$on('$ionicView.beforeEnter', function() {
      $rootScope.viewColor = $rootScope.myColor;
    });


    //** HEADER
    /**=========================**/
    $scope.$parent.showHeader();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);


    //** Scope
    /**=========================**/
    $scope.defenses = $rootScope.myDefenses;


    //** Popup
    /**=========================**/
    $scope.showConfirm = function (id, name, price) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Acheter : ' +name,
        template: 'Êtes-vous sûr de vouloir faire cet achat ?',
        cancelText: 'Non',
        okText: "Oui"
      });

      confirmPopup.then(function (res) {
        if (res) {
          $rootScope.coins -= price;

          for(var i = 0; i < $rootScope.myDefenses.length; i++){
            if($rootScope.myDefenses[i].id == id){
              $rootScope.myDefenses[i].mine = true;
            }
          }

        }
      });
    };

    //** Pay a defense
    /**=========================**/
    $scope.canPay = function(price) {
        return ($rootScope.coins >= price);
    };


    //** Details
    /**=========================**/
    $scope.details = function(id) {
      $state.go('app.details', {'idDefense': id});
    };


    //** Disable back button
    /**=========================**/
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: false
    });

  });
