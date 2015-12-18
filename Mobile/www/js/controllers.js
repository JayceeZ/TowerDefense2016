var app = angular.module('starter.controllers', [])

/**
app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
})
**/


app.controller('AccueilCtrl', function($scope) {

  /**
  var socket = io.connect('http://192.168.1.18:8080');

  socket.emit('log','coucou c moi');

  socket.on('world', function (params) {
    console.log('hello world');
  })
  **/

});