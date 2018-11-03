import template from '../../html/editor.html';

export default /** @ngInject */  function($compile) {
    return {
        require: '?ngModel',
        scope: {
            ngModel: '=',
            mode: '='
        },
        template: template,
        link: function () {

        },
        controller: function($scope, $element) {
            const bracketsRegExp = /\[\[(.*)\]\]/gm;
            // const editorMode = $scope.ngModel.type.alias.toLowerCase();

            $scope.getMatches = (data) => {
                return data.match(bracketsRegExp);
            };

            // $scope.wrapMatches = (data, matches) => {
            //     matches.forEach(match => {
            //         let wrap = `<span class="editor-wrap">${match}</span>`;
            //         data = data.replace(match, wrap);
            //     });
            //
            //     return data
            // };

            $scope.setParams = (matches) => {
                return matches.map(match => {
                    let alias = match.replace(bracketsRegExp, '$1');
                    let param = {
                        match: match,
                        name: alias, // @temp -> load from Model
                        alias: alias,
                        value: null
                    };

                    if (alias === 'app') {
                        param.values = [...$scope.ngModel.products].map(app => ({
                            name: app.name,
                            value: app.alias
                        }));
                    }

                    return param;
                });
            };

            $scope.setParamsValues = (params) => {
                return params.reduce((params, param) => {
                    params[param.match] = param.value;
                    return params;
                }, {});
            };

            $scope.processData = (data, paramsValues) => {
                return data.replace(bracketsRegExp, (match) => {
                    return paramsValues[match] || match;
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


            $scope.dataRaw = $scope.ngModel.data;
            $scope.dataRaw = $scope.ngModel.data;
            $scope.dataMatches = $scope.getMatches($scope.dataRaw);
            $scope.params = $scope.setParams($scope.dataMatches);

            // console.log($scope)

            $scope.$watch('params', (n, o) => {
                if (!angular.equals(n, o)) {
                    $scope.paramsValues = $scope.setParamsValues($scope.params);
                    $scope.data = $scope.processData($scope.dataRaw, $scope.paramsValues);
                    // $scope.title = $scope.processData($scope.titleRaw, $scope.paramsValues);
                }
            }, true);
        }
    }
}
