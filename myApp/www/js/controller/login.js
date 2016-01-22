/**
 * Created by salahbennour on 20/01/2016.
 */

'use strict';

angular.module('login.controllers', ['socket.service', 'config.service'])

  .controller('LoginCtrl', function($scope, $timeout, $stateParams, $state, ionicMaterialInk, $ionicLoading, socket, $cordovaCamera, $cordovaActionSheet, RESOURCES  ) {

    //** HEADER
    /**=========================**/
    $scope.$parent.clearFabs();
    $timeout(function() {
      $scope.$parent.hideHeader();
    }, 0);


    //** Scopes
    /**=========================**/
    $scope.username = '';
    $scope.isConnect = false;
    $scope.image = '';



    //** Connect to table
    /**=========================**/
    $scope.connect = function() {

      socket.connect(RESOURCES.server);
      showLoading(true);

      $timeout(function () {
        if(!socket.get().connected){
          $ionicLoading.hide();
          alert("pas co");
        }else{
          $ionicLoading.hide();
          $scope.isConnect = true;
        }
      }, 2000);

    };


    //** Play
    /**=========================**/
    $scope.play = function() {
      showLoading(false);
      socketEvents();
      var message = {"pseudo" : $scope.username};
      socket.emit("addPlayer", message);
    };


    //** Socket ON
    /**=========================**/
    function socketEvents() {
      socket.on('connectionStatus', function (data) {
        console.log(data.status + " -- " +data.message);
        $scope.status = data.status;
        $scope.message = data.message;
      });

      socket.on('gameReady', function (data) {
        console.log("Game ready");
        $ionicLoading.hide();
        $state.go('app.placements');
      });
    };


    //** ShowLoading
    /**=========================**/
    function showLoading(val) {
      if(val) {
        $ionicLoading.show({
          template: '<h4>Connection to table</h4></div><ion-spinner icon="ripple" class="spinner-assertive"></ion-spinner>',
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          showDelay: 0
        });
      }else{
        $ionicLoading.show({
          template: '<h4>Ready ! Wait others players</h4></div><ion-spinner icon="bubbles" class="spinner-assertive"></ion-spinner>',
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: false,
          maxWidth: 200,
          showDelay: 0
        });
      }
    }


    //** Photo - Image
    /**=========================**/

    var dial = {
      title: 'Inserez une photo',
      buttonLabels: ['Prendre une photo', 'Selectionner une photo existante'],
      addCancelButtonWithLabel: 'Annuler',
      androidEnableCancelButton: true,
      winphoneEnableCancelButton: true
    };

    $scope.urlForImage = function (imageName) {
      var name = imageName.substr(imageName.lastIndexOf('/') + 1);
      var trueOrigin = cordova.file.dataDirectory + name;
      return trueOrigin;
    };


    $scope.howTakePhoto = function () {
      $cordovaActionSheet.show(dial).then(function(btnIndex) {
        console.log(btnIndex);

        if(btnIndex == 1)       { addImage(true);}
        else if(btnIndex == 2)  { addImage(true);}
        else                    { }
      });

    };


    function addImage(val) {

      var options;

      if (val) {

        options = {
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: false,
          saveToPhotoAlbum: true,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions
        };

      } else {

        options = {
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions
        };

      }

      $cordovaCamera.getPicture(options).then(function (imageData) {

        onImageSuccess(imageData);

        function onImageSuccess(fileURI) {
          createFileEntry(fileURI);
        }

        function createFileEntry(fileURI) {
          window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
        }

        function copyFile(fileEntry) {
          var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
          var newName = makeid() + name;

          window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function (fileSystem2) {
              fileEntry.copyTo(
                fileSystem2,
                newName,
                onCopySuccess,
                fail
              );
            },
            fail);
        }

        function onCopySuccess(entry) {
          $scope.$apply(function () {
            $scope.image = entry.nativeURL;
          });
        }

        function fail(error) {
          console.log("fail: " + error.code);
        }

        function makeid() {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          }
          return text;
        }

      }, function (err) {
        console.log(err);
      });
    }

  });
