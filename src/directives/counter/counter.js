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
            scope.dropdown = element.children()[0].lastElementChild;
            scope.currentIndex = null;
            scope.quantity = null;
            scope.showInput = false;
            scope.options = _.range(scope.min, scope.max, scope.step);

            //helper functions
            function setIndexAndQuantity(quantity, index) {
                scope.quantity = quantity;
                scope.currentIndex = index;
            }
            function willGoAboveMax() {
                return scope.quantity + scope.step >= scope.max;
            }
            function willGoBelowMin() {
                return scope.quantity - scope.step <= scope.min;
            }

            scope.goUpOneStep = function () {
                if (scope.quantity === null) {
                    setIndexAndQuantity(scope.min, 0);
                }
                else if (willGoAboveMax()) {
                    setIndexAndQuantity(scope.max, scope.options.length - 1);
                }
                else {
                    var index = scope.options.indexOf(scope.quantity) + 1;
                    setIndexAndQuantity(scope.options[index], index);
                }
            };
            scope.goDownOneStep = function () {
                if (scope.quantity === null || willGoBelowMin()) {
                    setIndexAndQuantity(scope.min, 0);
                }
                else {
                    var index = scope.options.indexOf(scope.quantity) - 1;
                    setIndexAndQuantity(scope.options[index], index);
                }
            };
            if (scope.options.indexOf(scope.max) === -1) {
                scope.options.push(scope.max);
            }
            scope.toggleInput = function () {
                scope.showInput = true;
            };
            scope.setInputTo = function (choice, index) {
                scope.quantity = choice;
                scope.currentIndex = index;
            };
            scope.goToCurrentEl = (function () {
                var previousIndex;
                return function () {
                    if (scope.currentIndex !== null && scope.currentIndex !== previousIndex) {
                        previousIndex = scope.currentHash;
                        var currentEl = scope.dropdown.children[scope.currentIndex];
                        scope.dropdown.scrollTop = currentEl.offsetTop;
                    }
                }
            })();
        }
    }
});