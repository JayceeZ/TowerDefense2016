'use strict';

angular.module('stats.controllers', ['socket.service', 'config.service', 'chart.js', 'timer'])


  .controller('StatsCtrl', function($scope,$rootScope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $state, $ionicPopup, socket,$ionicHistory) {

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
    $scope.statut = "En cours ...";
    $scope.infoPlayer = {};
    $scope.idVague = "";
    $scope.idGame="";
    $scope.nextVague = false;
    $scope.timerRunning = true;

    $scope.pieChart = {};
    $scope.pieChart.labels = ["Ennemis tués", "Tirs lancés"];
    $scope.pieChart.data = [];


    //** Pie chart animation
    /**=========================**/
    $scope.pieChart.options =  {
      tooltipTemplate: "<%= value %>",
      onAnimationComplete: function()
      {
        this.showTooltip(this.segments, true);
      },
      tooltipEvents: [],
      showTooltips: true,
      responsive: false,
      maintainAspectRatio: false
    };


    //** Timer
    /**=========================**/
    $scope.startTimer = function (){
      $scope.$broadcast('timer-start');
      $scope.timerRunning = true;
    };

    function stopTimer() {
      $scope.$broadcast('timer-stop');
      $scope.timerRunning = false;
    };


    //** Socket ON
    /**=========================**/
    socketEvents();

    function socketEvents() {
        socket.on('globalUpdate', function (data) {
          $scope.infoPlayer = data.infoPlayer;
          $scope.idGame = data.infoGame.id;
          $scope.idVague = data.infoGame.vague;
          $scope.pieChart.data = [ $scope.infoPlayer.kills, $scope.infoPlayer.shots];
          updateUserGains();
        });


        socket.on('endVague', function (data) {
          stopTimer();
          $scope.statut = "Fin !";
          $scope.nextVague = true;
        });

        socket.on('endGame', function (data) {
          $scope.showAlert();
        });
    };

    //** Alert
    /**=========================**/
    $scope.showAlert = function () {
      var alertPopup = $ionicPopup.alert({
        title: 'Fin du jeu ',
        template: 'Merci d\'avoir jouer. A bientôt pour une nouvelle partie !'
      });

      alertPopup.then(function (res) {
        $state.go('app.login');
      });
    };


    //** Update user gains (points and money)
    /**=========================**/
    function updateUserGains() {
      $rootScope.points = $scope.infoPlayer.score;
      $rootScope.coins  = $scope.infoPlayer.money;
    }

    //** Next Vague
    /**=========================**/
    $scope.goNextVague = function () {
      $state.go('app.placements');
      reinit();
    };

    //** Reinit
    /**=========================**/
    function reinit() {
      $scope.statut = "En cours ...";
      $scope.labels = ["Ennemis tués", "Tirs lancés"];
      $scope.data = [0, 0];
      $scope.infoPlayer = {};
      $scope.infosPlayer = [];
      $scope.infosPlayer2 = [];
      $scope.idVague = "";
      $scope.idGame="";
      $scope.nextVague = false;
      $scope.timerRunning = true;
    }

    //** Disable back
    /**=========================**/
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });

  });
