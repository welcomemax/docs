export default /** @ngInject */  function($compile) {
    return {
        replace: true,
        link: function (scope, element, atts) {
            const controlTpl = `<control-${scope.param.control} class="${atts.class}"></control-${scope.param.control}>`;

            if (!scope.param.value && scope.param.values) {
                scope.param.value = scope.param.values && scope.param.values[0] ? scope.param.values[0].value : scope.param.default;
            }

            element.replaceWith($compile(angular.element(controlTpl))(scope));
        },
        controller: /** @ngInject */ function($scope) {
            $scope.setValue = (value) => {
                $scope.param.value = angular.isObject(value) ? value.value : value;
            };
        }
    }
}
