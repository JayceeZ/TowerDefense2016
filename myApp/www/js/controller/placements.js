/**
 * Created by salahbennour on 21/01/2016.
 */

'use strict';

angular.module('placement.controllers', ['socket.service', 'config.service'])

  .controller('PlacementCtrl', function ($scope, $rootScope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicPopup, socket, $ionicLoading, $state, $ionicHistory) {

    //** Nav bar color
    /**=========================**/
    $scope.$on('$ionicView.beforeEnter', function () {
      $rootScope.viewColor = $rootScope.myColor;
    });


    //** Remove the socket listeners whenever the controller is destroyed
    /**=========================**/
    $scope.$on('$destroy', function (event) {
      socket.removeAllListeners();
    });


    //** HEADER
    /**=========================**/
    $scope.$parent.showHeader();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);


    //** Scopes
    /**=========================**/
    $scope.defenses = $rootScope.myDefenses;
    $scope.selectedItem = -1;
    $scope.valid = false;
    $scope.onlyMine = false;


    $scope.changeSettings = function () {
      if($scope.onlyMine) {
        $scope.defenses = onlyMineDef();
      }else{
        $scope.defenses = $rootScope.myDefenses;
      }
    };


    function onlyMineDef() {
      var myDef = [];
      var myL = $rootScope.myDefenses.length;
      for(var i = 0; i < myL; i++) {
        if($scope.defenses[i].mine) {
          myDef.push($scope.defenses[i]);
        }
      }
      return myDef;
    }

    //** Select a defense
    /**=========================**/
    $scope.selectItem = function (id, cout) {
      if (id === $scope.selectedItem) {
        $scope.selectedItem = -1;
      }
      else {
        if (hasEnoughtMoney(cout)) {
          $scope.selectedItem = id;
          if (id != 1) {
            socket.emit("selectTower", 1);
          } else {
            socket.emit("selectTower", 2);
          }
        }else{
          if($scope.defenses[id].mine) {
            $scope.showAlert(cout);
          }
        }
      }
    };

    //** Valid placement
    /**=========================**/
    $scope.validIt = function () {
      socket.emit("putTower");
      debitUser($scope.selectedItem);
      $scope.valid = false;
    };


    $scope.canValid = function (id) {
      return ($scope.valid && ($scope.selectedItem == id));
    };

    //** Check if player has enought money
    /**=========================**/
    function hasEnoughtMoney(cout) {
      return $rootScope.coins >= cout;
    }


    //** Debit user
    /**=========================**/
    function debitUser(id) {
      for (var i = 0; i < $scope.defenses.length; i++) {
        if ($scope.defenses[i].id == id) {
          $rootScope.coins -= $scope.defenses[i].cout;
          break;
        }
      }
    }


    //** Buy
    /**=========================**/
    $scope.buy = function (name, cout) {
      if( $rootScope.coins >= cout ) {
        $scope.showDialog(name, cout);
      }else{
        $scope.showAlert(cout);
      }
    };


    //** Popup
    /**=========================**/
    $scope.showConfirm = function (name, price) {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Acheter : ' +name,
        template: 'Êtes-vous sûr de vouloir faire cet achat pour <b>'+price+'</b> pièces ?',
        cancelText: 'Non',
        okText: "Oui"
      });

      confirmPopup.then(function (res) {
        if (res) {
          $rootScope.coins -= price;
          var myL = $scope.defense.length;

          for(var i = 0 ; i < myL ; i++){
            if($scope.defense[i].name == name){
              $scope.defense[i].mine = true;
            }
          }
        }
      });
    };

      //** Alert
    /**=========================**/
    $scope.showAlert = function (cout) {
      var alertPopup = $ionicPopup.alert({
          title: ' Manque de liquidité ',
          template: 'Vous n\'avez pas assez de pièces pour acheter cette défense : <br><b>' + cout + '$ > '+ $rootScope.coins +'$</b>'
        });

        alertPopup.then(function (res) {
        });
    };

    $scope.confirmReady = function () {
      if($rootScope.coins >= 50) {

        var confirmPopup = $ionicPopup.confirm({
          title: 'Placez des défenses',
          template: 'Vous pouvez encore poser des défenses.<br>Êtes-vous sûr de vouloir lancer la vague ?',
          cancelText: 'Non',
          okText: "Oui"
        });

        confirmPopup.then(function (res) {
          if (res) {
            socket.emit("isReady", true);
            showLoading();
          }
        });
      }else{
        socket.emit("isReady", true);
        showLoading();
      }
    };




    //** SOCKET ON
    /**=========================**/
    socketEvents();

    function socketEvents() {
      socket.on('checkPlacement', function (data) {
        if (data === true && $scope.selectedItem !== -1) {
          $scope.valid = true;
        } else {
          $scope.valid = false;
        }
      });

      socket.on('launchVague', function (data) {
        $ionicLoading.hide();
        $state.go('app.stats');
      });

    };

    //** Go shop
    /**=========================**/
    $scope.goShop = function () {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: false
      });
      $state.go('app.shop');
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

    //** Disable back
    /**=========================**/
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });


  });
