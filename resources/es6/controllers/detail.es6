export default /** @ngInject */ function (itemObj, api, $scope, $routeParams, $httpParamSerializer) {
    $scope.id = $routeParams.id;
    $scope.item = itemObj.data[0];

    $scope.item.tags = $scope.item.tags || [];

    $scope.item.type && $scope.item.tags.unshift($scope.item.type);
    $scope.item.products.length > 3 ?
        $scope.item.tags.push({alias: 'many', name: 'Many Apps'}) :
        $scope.item.tags = [...$scope.item.tags, ...$scope.item.products];

    $scope.currentProduct = $scope.item.products[0];

    $scope.previewParams = $httpParamSerializer({
        'product': $scope.currentProduct.name,
        'platform': 'docs',
        'templatesHide': true,
        'installHide': true
    });
    $scope.previewUrl = `https://apps.elfsight.com/preview/${$scope.currentProduct.public_id}?${$scope.previewParams}`;
    $scope.icon = `/img/icons/apps/${$scope.currentProduct.alias}.svg`;
}
