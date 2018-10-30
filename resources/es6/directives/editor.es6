// import Jodit from 'jodit';

import template from '../../html/editor.html';
// import templateEditor from '../../html/editor.html';
// import templatePreview from '../../html/editor.html';

export default /** @ngInject */  function() {
    return {
        require: '?ngModel',
        scope: {
            ngModel: '=',
            mode: '='
        },
        template: template,
        replace: false,
        link: function ($scope) {
            $scope.$watch('ngModel', (newValue, oldValue) => {
                // if (newValue !== oldValue) {
                    console.log($scope.ngModel)
                // }
            });
        },
        controller: function($scope, $element) {
            const bracketsRegExp = /\[\[(.*)\]\]/gm;
            const editorMode = $scope.ngModel.type.alias.toLowerCase();

            let replaces = $scope.ngModel.data.match(bracketsRegExp);

            $scope.params = {};
            $scope.availParams = replaces.map((replacer) => {
                let type = replacer.replace(bracketsRegExp, '$1');
                let param = {
                    name: type,
                    type: type,
                    value: ''
                };

                if (type === 'app') {
                    param.values = [...$scope.ngModel.products].map((app) => {
                        return {
                            name: app.name,
                            value: app.alias
                        }
                    });
                    $scope.params.app = $scope.ngModel.products[0].alias; // @temp
                }
                return param;
            });

            

            $scope.copied = (e) => {
                let isBtn = e.trigger.tagName === 'BUTTON';
                let btn = isBtn ? angular.element(e.trigger) : angular.element(e.trigger).find('button');

                btn.text('Copied');
                setTimeout(() => {
                    btn.text('Copy');
                }, 5000)
            };
        }
    }
}
