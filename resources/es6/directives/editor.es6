import template from '../../html/editor.html';

export default /** @ngInject */  function() {
    return {
        require: '?ngModel',
        scope: {
            ngModel: '=',
            mode: '='
        },
        template: template,
        link: function () {

        },
        controller: function($scope, $location) {
            const bracketsRegExp = /\[\[(.*)\]\]/gm;
            // const editorMode = $scope.ngModel.type.alias.toLowerCase();

            // $scope.getMatches = (data) => {
            //     return data.match(bracketsRegExp);
            // };

            // $scope.wrapMatches = (data, matches) => {
            //     matches.forEach(match => {
            //         let wrap = `<span class="editor-wrap">${match}</span>`;
            //         data = data.replace(match, wrap);
            //     });
            //
            //     return data
            // };

            // $scope.getParams = (matches) => {
            //     return matches.map(match => {
            //         let alias = match.replace(bracketsRegExp, '$1');
            //         let param = {
            //             match: match,
            //             name: alias, // @temp -> load from Model
            //             alias: alias,
            //             value: null
            //         };
            //
            //         if (alias === 'app') {
            //             param.values = [...$scope.ngModel.products].map(app => ({
            //                 name: app.name,
            //                 value: app.alias
            //             }));
            //         }
            //
            //         return param;
            //     });
            // };

            $scope.formatParams = (params) => {
                // @TODO filter apps
                return params;
            };

            $scope.getParamsValues = (params) => {
                return params.reduce((params, param) => {
                    params[param.alias] = param.value;
                    return params;
                }, {});
            };

            $scope.processData = (data, paramsValues) => {
                return data.replace(bracketsRegExp, (match) => {
                    let alias = match.replace(bracketsRegExp, '$1');
                    return paramsValues[alias] || match;
                });
            };

            $scope.copied = (e) => {
                let isBtn = e.trigger.tagName === 'BUTTON';
                let btn = isBtn ? angular.element(e.trigger) : angular.element(e.trigger).find('button');

                btn.text('Copied');
                setTimeout(() => {
                    btn.text('Copy');
                }, 5000)
            };

            $scope.setUrlFromParams = (paramsValues) => {
                angular.forEach(paramsValues, (value, key) => {
                    $location.search(key, value || null);
                });
            };

            $scope.setParamsFromUrl = () => {
                angular.forEach($location.search(), (value, key) => {
                    $scope.params.forEach((param, i) => {
                        if (param.alias === key) {
                            $scope.params[i].value = value;
                        }
                    });
                });
            };

            $scope.dataRaw = $scope.ngModel.data;
            // $scope.dataMatches = $scope.getMatches($scope.dataRaw);
            // $scope.params = $scope.formatParams($scope.dataMatches);
            $scope.params = $scope.formatParams($scope.ngModel.params);
            $scope.setParamsFromUrl();

            $scope.$on('$locationChangeSuccess', function() {
                $scope.setParamsFromUrl();
            });

            $scope.$watch('params', (n, o) => {
                if (!angular.equals(n, o)) {
                    $scope.paramsValues = $scope.getParamsValues($scope.params);
                    $scope.data = $scope.processData($scope.dataRaw, $scope.paramsValues);
                    $scope.setUrlFromParams($scope.paramsValues);
                    // $scope.title = $scope.processData($scope.titleRaw, $scope.paramsValues);
                }
            }, true);
        }
    }
}
