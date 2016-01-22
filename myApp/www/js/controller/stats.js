/* global angular, document, window */
'use strict';

angular.module('stats.controllers', ['socket.service', 'config.service', 'chart.js', 'timer'])


  .controller('StatsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $state) {


    //** HEADER
    /**=========================**/
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    //** HEADER
    /**=========================**/
    $scope.statut = "En cours ...";
    $scope.labels = ["Ennemis tués", "Tirs lancés"];
    $scope.data = [300, 500];

    $scope.timerRunning = true;

    $scope.startTimer = function (){
      $scope.$broadcast('timer-start');
      $scope.timerRunning = true;
    };

    $scope.stopTimer = function (){
      $scope.$broadcast('timer-stop');
      $scope.timerRunning = false;
    };

    $scope.$on('timer-stopped', function (event, args) {
      console.log('timer-stopped args = ', args);
    });


  });
