'use strict';

/**
 * Datetime directive (date and time input element)
 */
angular.module('g1b.datetime-input', []).
directive('datetimeInput', ['$document', function ($document) {
  return {
    restrict: 'E',
    scope: {
      datetime: '=',
      onChange: '&',
      placeholder: '@'
    },
    replace: true,
    templateUrl: './datetime-input.html',
    compile: function () {
      return {
        pre: function preLink() {},
        post: function postLink(scope, element) {

          // Get current date
          scope.current = moment();

          // Toggle edit popover
          scope.toggleEditPopover = function () {
            if ( !!scope.selected ) {
              scope.selected = undefined;
            } else {
              scope.selected = scope.datetime || moment();
              scope.calendar = scope.selected.clone();
            }
          };

          // Update selected date
          scope.setDate = function (date, calendar_update) {
            if ( scope.selected.isSame(date) ) { return; }
            if ( !date ) {
              scope.selected = scope.datetime = undefined;
            } else {
              scope.selected.year(date.year()).month(date.month()).date(date.date()).hours(date.hours()).minutes(date.minutes()).seconds(date.seconds());
              if ( (scope.selected.clone().startOf('week').month() !== scope.calendar.month() && scope.selected.clone().endOf('week').month() !== scope.calendar.month()) || calendar_update ) {
                scope.calendar = scope.selected.clone();
              }
            }
            if ( !scope.datetime ) {
              scope.datetime = scope.selected;
            }
            scope.onChange();
          };

          // Convert datetime object to moment.js if its not a moment object yet
          if ( scope.datetime && !scope.datetime._isAMomentObject ) {
            scope.datetime = moment(scope.datetime);
          }

          // Bind click events outside directive to close edit popover
          $document.on('mousedown', function (e) {
            if ( !!scope.selected && !element[0].contains(e.target) ) {
              scope.$apply(function () {
                scope.selected = '';
                scope.calendar_active = false;
              });
            }
          });
        }
      };
    }
  };
}]);
