if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
    module.exports = 'ng-counter-directive';
}

(function (angular) {
    'use strict';
    var app = angular.module('ng-counter-directive', ['ui.bootstrap', 'vs-repeat']);

    app.directive('counter', function () {
        return {
            restrict: 'E',
            template: '<div class="btn-group" uib-dropdown is-open="status.isopen" ng-show="!showInput"><button class="btn btn-default" ng-click="goDownOneStep()">-</button><button id="single-button" type="button" class="btn btn-primary text-center" uib-dropdown-toggle ng-disabled="disabled" ng-click="goToCurrentEl()">{{quantity ? quantity: "Choose a quantity"}}</button><button class="btn btn-default" ng-click="goUpOneStep()">+</button><ul vs-repeat class="uib-dropdown-menu scrollable-dropdown" role="menu" aria-labelledby="single-button"><li ng-repeat="option in options track by $index" ng-click="setInputTo(option, $index)"><a>{{option}}</a></li></ul></div>',
            scope: {
                max: '=',
                min: '=',
                step: '=',
                model: '='
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
                        setIndexAndQuantity(scope.min, 1);
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
                        setIndexAndQuantity(0, 0);
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
})(window.angular);
