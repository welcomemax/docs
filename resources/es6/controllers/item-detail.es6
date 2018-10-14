export default /** @ngInject */ function (itemObj, api, $scope, $routeParams, $location) {
    $scope.item = $routeParams.id ? itemObj.data[0] : {};

    $scope.item.tags = $scope.item.tags || [];
    $scope.item.tags.push($scope.item.type.name);
    $scope.item.tags.push($scope.item.product.name);

    $scope.save = function() {
        let fd = new FormData();

        fd.append('title', $scope.item.title);
        fd.append('caption', $scope.item.caption || '');
        fd.append('data', $scope.item.data || '');

        api('items/' + $routeParams.id, 'post', fd).then(function(response) {
            console.log(response);
            $location.path('/');
        });
    };

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

    // $scope.delete = function() {
    //     if (confirm('Уверены?')) {
    //         $http({
    //             method: 'DELETE',
    //             url: url
    //         }).then(function(response) {
    //             console.log(response);
    //             $location.path('/');
    //         });
    //     }
    // };
}
