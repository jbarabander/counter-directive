app.directive('counterSelector', function () {
    return {
        restrict: 'E',
        templateUrl: '/directives/counter/counter.html',
        scope: {
            max: '=',
            min: '=',
            step: '='
        },
        link: function (scope, element, attrs) {
            scope.quantity = null;
            scope.showInput = false;
            scope.options = _.range(scope.min, scope.min + scope.step * 5, scope.step);
            scope.toggleInput = function() {
                scope.showInput = true;
            }
            scope.setInputTo = function(choice) {
                scope.quantity = choice;
            }
        }
    }
})