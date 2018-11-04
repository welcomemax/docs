export default /** @ngInject */  function($compile) {
    return {
        replace: true,
        link: function (scope, element, atts) {
            if (!scope.param.value && scope.param.values) {
                let firstValue = scope.param.values[0];
                scope.param.value = angular.isObject(firstValue) ? firstValue.value : firstValue;
            }

            scope.param.name = scope.param.name || scope.param.alias;

            const controls = {
                app: 'input',
                color: 'input'
            };

            if (!scope.param.control) {
                scope.param.control = controls[scope.param.alias];
            }

            if (scope.param.control) {
                let controlTpl = `<control-${scope.param.control} class="${atts.class}"></control-${scope.param.control}>`;

                element.replaceWith($compile(angular.element(controlTpl))(scope));
            }
        },
        controller: /** @ngInject */ function($scope) {
            $scope.setValue = (value) => {
                $scope.param.value = angular.isObject(value) ? value.value : value;
            };
        }
    }
}
