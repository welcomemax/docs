import Jodit from 'jodit';

import template from '../../html/editor.html';

export default /** @ngInject */  function() {
    return {
        require: '?ngModel',
        scope: {
            ngModel: '=',
            type: '='
        },
        template: template,
        replace: false,
        link: function () {

        },
        controller: function($scope, $element) {
            let type = typeof $scope.type === 'string' ? $scope.type : $scope.type.name;
            type = type.toLowerCase();

            if (['css', 'js'].includes(type)) {
                $scope.editor = new Jodit($element.find('textarea')[0], {
                    "sourceEditorNativeOptions": {
                        "mode": "ace/mode/" + type
                    },
                    "toolbar": false,
                    "disablePlugins": "xpath,stat",
                    "defaultMode": Jodit.MODE_SOURCE
                });
            } else {

            }


            $scope.editor.events.on('afterInit', function () {
                $scope.editor.value = $scope.ngModel || '';
            });
            $scope.editor.events.on('change', () => {
                $scope.ngModel = $scope.editor.value;
                $scope.$apply();
            });
        }
    }
}
