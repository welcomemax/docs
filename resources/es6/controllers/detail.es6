export default /** @ngInject */ function (itemObj, api, $scope, $routeParams) {
    $scope.id = $routeParams.id;
    $scope.item = itemObj.data[0];

    $scope.item.tags = $scope.item.tags || [];

    $scope.item.type && $scope.item.tags.unshift($scope.item.type);
    $scope.item.products.length > 3 ?
        $scope.item.tags.push({alias: 'many', name: 'Many Apps'}) :
        $scope.item.tags = [...$scope.item.tags, ...$scope.item.products];

    $scope.item.currentProduct = $scope.item.products[0];
}
