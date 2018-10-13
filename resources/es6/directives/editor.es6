import Jodit from 'jodit';

import template from '../../html/editor.html';

export default /** @ngInject */  function() {
    return {
        require: '?ngModel',
        scope: {
            ngModel: '=',
        },
        template: template,
        replace: false,
        link: function () {

        },
        controller: function($scope, $element) {
            $scope.editor = new Jodit($element.find('textarea')[0], {
                "sourceEditorNativeOptions": {
                    "mode": "ace/mode/css"
                },
                "toolbar": false,
                "disablePlugins": "xpath,stat",
                "defaultMode": Jodit.MODE_SOURCE
            });

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
