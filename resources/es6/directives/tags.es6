import template from '../../html/tags.html';

export default /** @ngInject */  function() {
    return {
        scope: {
            ngModel: '=',
            icon: '='
        },
        template: template,
        replace: false,
        link: function(scope, element) {

        },
        controller: /** @ngInject */ function($scope) {

        }
    }
}
