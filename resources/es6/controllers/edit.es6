export default /** @ngInject */ function (itemObj, api, $scope, $routeParams, $location) {
    $scope.id = $routeParams.id;
    $scope.item = id ? itemObj.data[0] : {};

    $scope.save = function() {
        api(`items/${id}`, 'post', $scope.item).then(function(response) {
            console.log(response);
            $location.path(`/detail/${id}`);
        });
    };

    $scope.delete = function() {
        if (confirm('Are you sure?')) {
            api(`items/${id}`, 'delete').then(function(response) {
                console.log(response);
                $location.path('/');
            });
        }
    };
}
