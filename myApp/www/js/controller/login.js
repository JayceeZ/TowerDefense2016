/**
 * Created by salahbennour on 20/01/2016.
 */

'use strict';

angular.module('login.controllers', ['socket.service', 'config.service'])

  .controller('LoginCtrl', function($scope,$rootScope, $timeout, $stateParams, $state, ionicMaterialInk, $ionicLoading, socket, $ionicPopup, $cordovaActionSheet, RESOURCES, $ionicHistory) {


    //** Scopes
    /**=========================**/
    $scope.username = '';
    $scope.isConnected = false;
    $rootScope.coins = 100;
    $rootScope.points = 0;
    $rootScope.myDefenses = RESOURCES.defenses;

    //** Connect to table
    /**=========================**/
    $scope.connect = function() {

      socket.connect(RESOURCES.server);
      showLoading(true);

      $timeout(function () {
        if(!socket.get().connected){
          $ionicLoading.hide();
          $scope.showAlert();
        }else{
          $ionicLoading.hide();
          $scope.isConnected = true;
        }
      }, 2000);

    };


    //** Play
    /**=========================**/
    $scope.play = function() {
      showLoading(false);
      socketEvents();
      socket.emit("addPlayer", {"pseudo" : $scope.username});
    };


    //** Socket ON
    /**=========================**/
    function socketEvents() {
      socket.on('connectionStatus', function (data) {
        $scope.status = data.status;
        $scope.message = data.message;
      });

      socket.on('playerColorUpdate', function (data) {
        $rootScope.myColor = data;
      });

      socket.on('gameReady', function (data) {
        $ionicLoading.hide();
        $state.go('app.placements');
      });
    };


    //** Alert
    /**=========================**/
    $scope.showAlert = function () {
      var alertPopup = $ionicPopup.alert({
        title: ' Echec de connexion' +name,
        template: 'Echec de connexion à la table. Réessayez.'
      });

      alertPopup.then(function (res) {
      });
    };

    //** ShowLoading
    /**=========================**/
    function showLoading(val) {
      if(val) {
        $ionicLoading.show({
          template: '<h4>Connexion à la table ...</h4></div><ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          showDelay: 0
        });
      }else{
        $ionicLoading.show({
          template: '<h4>Prêt. En attente des autres joueurs ...</h4></div><ion-spinner icon="bubbles" class="spinner-assertive"></ion-spinner>',
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          showDelay: 0
        });
      }
    }

    //** Disable back
    /**=========================**/
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });

    //** HEADER
    /**=========================**/
    $scope.$parent.clearFabs();
    $timeout(function() {
      $scope.$parent.hideHeader();
    }, 0);


  });
