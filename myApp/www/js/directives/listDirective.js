/**
 * Created by salahbennour on 21/01/2016.
 */

angular.module('mydir', [])

.directive('ngLastRepeat', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      if (scope.$last === true) {
        $timeout(function () {
          scope.$emit('ngLastRepeat'+ (attr.ngLastRepeat ? '.'+attr.ngLastRepeat : ''));
        });
      }
    }
  }
});
