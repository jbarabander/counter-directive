if (typeof module !== "undefined" && typeof exports !== "undefined" && module.exports === exports) {
    module.exports = 'ng-counter-directive';
}

(function (angular) {
    'use strict';
    var app = angular.module('ng-counter-directive', ['ui.bootstrap', 'vs-repeat']);

    app.directive('counter', function () {
        return {
            restrict: 'E',
            template: '<div class="btn-group" uib-dropdown is-open="status.isopen"><button class="btn btn-default" ng-click="goDownOneStep()">-</button><button id="single-button" type="button" class="btn btn-primary text-center" uib-dropdown-toggle ng-disabled="disabled" ng-click="setNewScrollTop()">{{quantityIsNonZeroFalsey() ? message: quantity}}</button><button class="btn btn-default" ng-click="goUpOneStep()">+</button><ul vs-repeat class="uib-dropdown-menu scrollable-dropdown" role="menu" aria-labelledby="single-button"><li ng-repeat="option in options track by $index" ng-click="setInputTo(option, $index)"><a ng-style="{{style}}">{{option}}</a></li></ul></div>',
            scope: {
                max: '=',
                min: '=',
                step: '=',
                quantity: '=',
                cellHeight: '@',
                clears: '@',
                message: '='
            },
            link: function (scope, element, attrs) {
                if(!scope.message) scope.message = 'Choose a quantity';
                scope.clearsIsBlank = scope.clears === '';
                scope.clearsIsUndef = scope.clears === undefined;

                scope.scrollOffset = 0;
                scope.minClear = false;
                if(scope.clearsIsBlank) {
                    scope.minClear = true;
                } else if(!scope.clearsIsUndef) {
                    scope.scrollOffset = 1;
                }

                scope.elementHeight = convertToPixels(scope.cellHeight) ? convertToPixels(scope.cellHeight) : 26;
                scope.style = {'height': scope.elementHeight + 'px'};
                scope.dropdown = element.children()[0].lastElementChild;
                // scope.elementHeight;
                scope.quantityIsNonZeroFalsey = function() {
                    return scope.quantity === null || scope.quantity === undefined;
                }

                function range(start, stop, step) {
                    var rangeArr = [];
                    var totalSteps = Math.floor((stop - start)/step);
                    for(var i = 0; i <= totalSteps; i++) {
                        rangeArr.push(start + step * i);
                    }
                    return rangeArr;
                }

                scope.options = range(scope.min, scope.max, scope.step);
                if(!scope.clearsIsBlank && !scope.clearsIsUndef) {
                    scope.options.unshift(scope.clears);
                }

                // if(scope.min > 0) {
                //     scope.options.unshift(0);
                // }
                // if(scope.min >= 0) {
                //     scope.quantity = 0;
                // } //FIXME

                scope.setNewScrollTop = function() {
                    scope.dropdown.scrollTop = scope.quantityIsNonZeroFalsey() ? 0 : ((scope.quantity - scope.min + scope.scrollOffset) / scope.step) * scope.elementHeight;
                }
                ////helper functions////       
                function convertToPixels(height) {
                    var pxRegex = /^\d*\.*\d+px$/;
                    // var emRegex = /^\d*\.*\d+em$/;
                    var ptRegex = /^\d*\.*\d+pt$/;
                    var cmRegex = /^\d*\.*\d+cm$/;
                    var inRegex = /^\d*\.*\d+in$/;
                    var pcRegex = /^\d*\.*\d+pc$/;
                    if(pxRegex.test(height)) {
                        return Math.round(parseFloat(height.replace('px', '')));
                    // } else if(emRegex.test(height)) {
                    //     return Math.round(16 * parseFloat(height.replace('em', '')));
                    } else if(ptRegex.test(height)) {
                        return Math.round((4/3) * parseFloat(height.replace('pt', '')));
                    } else if(cmRegex.test(height)) {
                        return Math.round(37.8 * parseFloat(height.replace('cm', '')));
                    } else if(inRegex.test(height)) {
                        return Math.round(96 * parseFloat(height.replace('in', '')));
                    } else if(pcRegex.test(height)) {
                        return Math.round(12 * parseFloat(height.replace('pc', '')));
                    }
                    return parseFloat(height);
                }


                function willGoAboveMax() {
                    return scope.quantity + scope.step >= scope.max;
                }

                function willGoBelowMin() {
                    return scope.quantity - scope.step <= scope.min;
                }

                scope.goUpOneStep = function () {
                    if (scope.quantityIsNonZeroFalsey()) {
                        scope.quantity = scope.minClear ? scope.min + scope.step : scope.min;
                    }
                    else if (willGoAboveMax()) {
                        scope.quantity = scope.max;
                    }
                    else {
                        var index = scope.options.indexOf(scope.quantity) + 1;
                        scope.quantity = scope.options[index];
                    }
                };
                scope.goDownOneStep = function () {
                    if (scope.quantityIsNonZeroFalsey() || willGoBelowMin()) {
                        scope.quantity = (!scope.clearsIsBlank && !scope.clearsIsUndef && scope.quantity === scope.min) || scope.minClear ? null : scope.min;
                    } else {
                        var index = scope.options.indexOf(scope.quantity) - 1;
                        scope.quantity = scope.options[index];
                    }
                };
                if (scope.options.indexOf(scope.max) === -1) {
                    scope.options.push(scope.max);
                }
                scope.setInputTo = function (choice, index) {
                    if((choice === scope.min && scope.minClear) || (!scope.minClear && !scope.clearsIsUndef && choice === scope.clears && index === 0)) {
                        scope.quantity = null;
                    } else {
                        scope.quantity = choice;
                    }
                    
                };
            }
        }
    });
})(window.angular);