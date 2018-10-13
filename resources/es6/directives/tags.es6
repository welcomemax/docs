import template from '../../html/tags.html';

export default /** @ngInject */  function() {
    return {
        scope: {
            tags: '=',
            ngModel: '=',
        },
        template: template,
        replace: false,
        link: function($scope, $element) {
            console.log($scope)
        },
        controller: /** @ngInject */ function($scope) {

        }
    }
}
