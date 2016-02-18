angular.module('socket.service', [])

  .factory('socket', function ($rootScope) {

    var socket = null;

    return {
      get : function() {
        return socket;
      },

      connect : function(server) {
        socket = io.connect(server);
      },

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
      },

      removeAllListeners: function (eventName, callback) {
        socket.removeAllListeners(eventName, function() {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      }
    };
  });
