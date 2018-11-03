import template from '../../html/directives/preview.html';

export default /** @ngInject */  function($httpParamSerializer) {
    return {
        scope: {
            app: '='
        },
        template: template,
        replace: true,
        link: function(scope) {
            scope.show = false;
            scope.params = $httpParamSerializer({
                'product': scope.app.name,
                'platform': 'docs',
                'templatesHide': true,
                'installHide': true
            });
            scope.url = `https://apps.elfsight.com/preview/${scope.app.public_id}?${scope.params}`;
            scope.icon = `/img/icons/apps/${scope.app.alias}.svg`;
        },
        controller: /** @ngInject */ function($scope, $element) {
            $scope.previewCreate = () => {
                let preview = document.createElement('iframe');

                preview.src = $scope.url;
                preview.classList.add('preview-iframe');
                preview.onload = () => {
                    $element.addClass('preview-loaded')
                };

                $element.append(preview);

                return angular.element(preview);
            };

            $scope.previewDestroy = () => {
                $scope.preview.detach();
                $element.removeClass('preview-loaded');
                $scope.preview = null;
            };

            $scope.$watch('show', (show) => {
                if (show) {
                    if (!$scope.preview) {
                        $scope.preview = $scope.previewCreate();
                    }
                } else {
                    $scope.preview && $scope.previewDestroy();
                }
            });
        }
    }
}
