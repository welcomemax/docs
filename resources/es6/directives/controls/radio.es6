import template from '../../../html/controls/radio.html';

export default /** @ngInject */  function() {
    return {
        // require: '?ngModel',
        // scope: {
        //     ngModel: '='
        // },
        template: template,
        replace: true,
        controller: /** @ngInject */ function($scope) {
            $scope.setValue = (value) => {
                console.log(value)
                $scope.ngModel.value = value;
            }
        }
    }
}
