app.directive('inStep', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ctrl) {
            var stepSize = -1;
            attr.$observe('inStep', function(value) {
                var value = parseFloat(value);
                stepSize = isNaN(value) ? -1 : value;
                ctrl.$validate();
            });
            ctrl.$validators.inStep = function(modelValue, viewValue) {
                if(parseFloat(viewValue) % stepSize === 0) return true;
                return false;
            }
        }
    }
})