if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
    module.exports = 'ng-counter-directive';
}

(function (angular) {
    'use strict';
    var app = angular.module('ng-counter-directive', ['ui.bootstrap', 'vs-repeat']);

    app.directive('counter', function () {
        return {
            restrict: 'E',
            template: '<div class="btn-group" uib-dropdown is-open="status.isopen" ng-show="!showInput"><button class="btn btn-default" ng-click="goDownOneStep()">-</button><button id="single-button" type="button" class="btn btn-primary text-center" uib-dropdown-toggle ng-disabled="disabled" ng-click="goToCurrentEl()">{{quantity ? quantity: "Choose a quantity"}}</button><button class="btn btn-default" ng-click="goUpOneStep()">+</button><ul vs-repeat class="uib-dropdown-menu scrollable-dropdown" role="menu" aria-labelledby="single-button"><li ng-repeat="option in options track by $index" ng-click="setInputTo(option, $index, $event)"><a ng-style="style">{{option}}</a></li></ul></div>',
            scope: {
                max: '=',
                min: '=',
                step: '=',
                quantity: '=',
                cellHeight: '@'
            },
            link: function (scope, element, attrs) {
                scope.elementHeight = scope.cellHeight ? scope.cellHeight : 26;

                scope.style = {'height': scope.elementHeight + 'px !important'};
                scope.dropdown = element.children()[0].lastElementChild;
                // scope.elementHeight;
                scope.currentIndex = null;
                scope.showInput = false;
                scope.options = _.range(scope.min, scope.max, scope.step);
                if(scope.min > 0) {
                    scope.options.unshift(0);
                }
                if(scope.min >= 0) {
                    scope.quantity = 0;
                } //FIXME
                scope.setNewScrollTop = function(quantity) {
                    scope.dropdown.scrollTop = ((scope.quantity - scope.min) / scope.step) * scope.elementHeight;
                }
                ////helper functions////
                function setElementHeight(event) {
                    if(!scope.elementHeight) {
                        scope.elementHeight = event.target.offsetHeight;
                    }
                }

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
                        setIndexAndQuantity(0, scope.min < 0 ? scope.min : 0);
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
                scope.setInputTo = function (choice, index, $event) {
                    setElementHeight($event);                
                    scope.quantity = choice;
                    scope.currentIndex = index;
                };
                scope.goToCurrentEl = (function () {
                    var previousIndex;
                    var elementHeight;
                    return function () {
                        if(!elementHeight) elementHeight
                        if (scope.currentIndex !== null && scope.currentIndex !== previousIndex) {
                            console.log(scope.dropdown.children);
                            console.log(scope.currentIndex);
                            previousIndex = scope.currentHash;
                            var currentEl = scope.dropdown.children[scope.currentIndex];
                            scope.setNewScrollTop()
                        }
                    }
                })();
            }
        }
    });
})(window.angular);
