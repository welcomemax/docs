export default /** @ngInject */ function (itemObj, api, $scope, $routeParams, $location) {
    $scope.item = $routeParams.id ? itemObj.data[0] : {};

    console.log($scope)

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
