if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
    module.exports = 'ng-counter-directive';
}

(function (angular) {
    'use strict';
    var app = angular.module('ng-counter-directive', ['ui.bootstrap', 'vs-repeat']);

    app.directive('counter', function () {
        return {
            restrict: 'E',
            template: '<div class="btn-group" uib-dropdown is-open="status.isopen" ng-show="!showInput"><button class="btn btn-default" ng-click="goDownOneStep()">-</button><button id="single-button" type="button" class="btn btn-primary text-center" uib-dropdown-toggle ng-disabled="disabled" ng-click="setNewScrollTop()">{{quantity ? quantity: "Choose a quantity"}}</button><button class="btn btn-default" ng-click="goUpOneStep()">+</button><ul vs-repeat class="uib-dropdown-menu scrollable-dropdown" role="menu" aria-labelledby="single-button"><li ng-repeat="option in options track by $index" ng-click="setInputTo(option)"><a ng-style="{{style}}">{{option}}</a></li></ul></div>',
            scope: {
                max: '=',
                min: '=',
                step: '=',
                quantity: '=',
                cellHeight: '@',
                minClears: '@'
            },
            link: function (scope, element, attrs) {
                console.log(Boolean(scope.minClears))
                scope.elementHeight = scope.cellHeight ? scope.cellHeight : 26;
                scope.style = {'height': scope.elementHeight + 'px'};
                scope.dropdown = element.children()[0].lastElementChild;
                // scope.elementHeight;
                // scope.currentIndex = null;
                scope.showInput = false;
                scope.options = _.range(scope.min, scope.max, scope.step);
                // if(scope.min > 0) {
                //     scope.options.unshift(0);
                // }
                // if(scope.min >= 0) {
                //     scope.quantity = 0;
                // } //FIXME

                scope.setNewScrollTop = function(quantity) {
                    scope.dropdown.scrollTop = ((scope.quantity - scope.min) / scope.step) * scope.elementHeight;
                }
                ////helper functions////
                function setElementHeight(event) {
                    if(!scope.elementHeight) {
                        scope.elementHeight = event.target.offsetHeight;
                    }
                }

                // function setIndexAndQuantity(quantity, index) {
                //     scope.quantity = quantity;
                //     scope.currentIndex = index;
                // }
                function setQuantity(quantity) {
                    scope.quantity = quantity;
                    // scope.currentIndex = index;
                }

                function willGoAboveMax() {
                    return scope.quantity + scope.step >= scope.max;
                }

                function willGoBelowMin() {
                    return scope.quantity - scope.step <= scope.min;
                }

                scope.goUpOneStep = function () {
                    if (scope.quantity === null) {
                        setQuantity(Boolean(scope.minClears) ? scope.min + scope.step : scope.min);
                    }
                    else if (willGoAboveMax()) {
                        setQuantity(scope.max);
                    }
                    else {
                        var index = scope.options.indexOf(scope.quantity) + 1;
                        setQuantity(scope.options[index]);
                    }
                };
                scope.goDownOneStep = function () {
                    if (scope.quantity === null || willGoBelowMin()) {
                        setQuantity(Boolean(scope.minClears) ? null : scope.min);
                        scope.dropdown.scrollTop = 0;
                    }
                    else {
                        var index = scope.options.indexOf(scope.quantity) - 1;
                        setQuantity(scope.options[index]);
                    }
                };
                if (scope.options.indexOf(scope.max) === -1) {
                    scope.options.push(scope.max);
                }
                scope.toggleInput = function () {
                    scope.showInput = true;
                };
                scope.setInputTo = function (choice) {
                    if(choice === scope.min && Boolean(scope.minClears)) {
                        scope.quantity = null;
                        scope.dropdown.scrollTop = 0;
                    } else {
                        scope.quantity = choice;
                    }
                    // setElementHeight($event);                
                    
                };
                // scope.goToCurrentEl = (function () {
                //     var previousIndex;
                //     // var elementHeight;
                //     return function () {
                //         // if (scope.currentIndex !== null && scope.currentIndex !== previousIndex) {
                //         //     console.log(scope.dropdown.children);
                //         //     // console.log(scope.currentIndex);
                //         //     previousIndex = scope.currentHash;
                //         //     // var currentEl = scope.dropdown.children[scope.currentIndex];
                //             scope.setNewScrollTop()
                //         // }
                //     }
                // })();
            }
        }
    });
})(window.angular);