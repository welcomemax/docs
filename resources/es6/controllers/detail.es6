export default /** @ngInject */ function (itemObj, api, $scope, $routeParams) {
    $scope.id = $routeParams.id;
    $scope.item = itemObj.data[0];

    $scope.item.tags = $scope.item.tags || [];
    $scope.item.tags.push($scope.item.type.name);
    $scope.item.tags.push($scope.item.product.name);

    $scope.copied = function(e) {
        let btn;

        if (e.trigger.tagName === 'BUTTON') {
            btn = angular.element(e.trigger);
        } else {
            btn = angular.element(e.trigger).find('button');
        }

        btn.text('Copied');
        setTimeout(() => {
            btn.text('Copy');
        }, 5000)
    };
}
