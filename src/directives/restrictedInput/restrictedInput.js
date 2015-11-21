app.directive('restrictedInput', function() {
    return {
        restrict: 'E',
        scope: {
            max: '=',
            min: '=',
            step: '=',
            quantity: '='
        },
        templateUrl: 'directives/restrictedInput/restrictedInput.html',
        link: function(scope, element, attrs) {
            element.on('keypress', function(event) {
                var keyNum = event.which;
                if((keyNum > 57 || keyNum < 48) && keyNum !== 13 && (keyNum !== 46 || scope.quantity.indexOf('.') !== -1)) {
                    event.preventDefault();
                } else {

                }
            });
            //element.on('input', function() {
            //    console.log('change');
            //})
        }
    }
});