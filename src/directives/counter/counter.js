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
                if(scope.quantity === null) {
                    scope.quantity = scope.min;
                    $location.hash(0);
                }
                else if(scope.quantity + scope.step >= scope.max)  {
                    scope.quantity = scope.max;
                    $location.hash(scope.options.length - 1);
                }
                else  {
                    var index = scope.options.indexOf(scope.quantity) + 1;
                    scope.quantity = scope.options[index];
                    $location.hash(index);
                }
            };
            scope.goDownOneStep = function() {
                if(scope.quantity === null || scope.quantity - scope.step <= scope.min) {
                    scope.quantity = scope.min;
                    $location.hash(0);
                }
                else {
                    var index = scope.options.indexOf(scope.quantity) - 1;
                    scope.quantity = scope.options[index];
                    $location.hash(index);
                }
            };
            scope.quantity = null;
            scope.showInput = false;
            scope.options = _.range(scope.min, scope.max, scope.step);
            if(scope.options.indexOf(scope.max) === -1) {
                scope.options.push(scope.max);
            }
            scope.toggleInput = function() {
                scope.showInput = true;
            };
            scope.setInputTo = function(choice, index) {
                scope.quantity = choice;
                $location.hash(index);
            };
            scope.goToCurrentEl = function() {
                $anchorScroll();
            };
        }
    }
});