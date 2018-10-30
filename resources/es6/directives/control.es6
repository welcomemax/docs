export default /** @ngInject */  function($compile) {
    return {
        require: '?ngModel',
        scope: {
            ngModel: '=',
        },
        replace: true,
        link: function ($scope, element) {
            const controls = {
                app: 'radio'
            };

            if (!$scope.ngModel.control) {
                $scope.ngModel.control = controls[$scope.ngModel.type];
            }

            if ($scope.ngModel.control) {
                let controlTpl = '<control-#type#></control-#type#>';
                let newElement = angular.element(controlTpl.replace('#type#', $scope.ngModel.control));

                element.replaceWith($compile(newElement)($scope));
            }
        }
    }
}
