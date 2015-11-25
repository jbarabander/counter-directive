app.directive('counter', function ($location, $anchorScroll) {
    return {
        restrict: 'E',
        templateUrl: '/directives/counter/counter.html',
        scope: {
            max: '=',
            min: '=',
            step: '='
        },
        link: function (scope, element, attrs) {
            scope.goUpOneStep = function() {
                if(scope.quantity === null) scope.quantity = scope.min;
                else if(scope.quantity + scope.step >= scope.max) scope.quantity = scope.max;
                else scope.quantity = scope.options[scope.options.indexOf(scope.quantity) + 1];
            };
            scope.goDownOneStep = function() {
                if(scope.quantity === null) scope.quantity = scope.min;
                else if(scope.quantity - scope.step <= scope.min) scope.quantity = scope.min;
                else scope.quantity = scope.options[scope.options.indexOf(scope.quantity) - 1];
            }
            scope.quantity = null;
            scope.showInput = false;
            scope.options = _.range(scope.min, scope.max, scope.step);
            if(scope.options.indexOf(scope.max) === -1) {
                scope.options.push(scope.max);
            }
            scope.toggleInput = function() {
                scope.showInput = true;
            }
            scope.setInputTo = function(choice, index) {
                scope.quantity = choice;
                $location.hash(index);
            }
            scope.goToCurrentEl = function() {
                $anchorScroll();
            }
        }
    }
})