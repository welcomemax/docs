export default /** @ngInject */ function (itemsObj, productsObj, typesObj, $scope, $filter) {
    $scope.items = itemsObj.data;

    productsObj.data.forEach((product) => {
        $scope.products = $scope.products || [];

        $scope.products.push(product.name)
    });

    typesObj.data.forEach((type) => {
        $scope.types = $scope.types || [];

        $scope.types.push(type.name)
    });

    $scope.items.forEach((item) => {
        item.tags = item.tags || [];

        item.tags.push(item.type.name);
        item.tags.push(item.product.name);
    });

    $scope.sortType = 'id';
    $scope.sortReverse = false;

    $scope.filterItems = $scope.items;
    $scope.currentPage = 0;
    $scope.itemsPerPage = 5;
    $scope.search = '';

    $scope.toggleSort = function ($event) {
        $scope.sortType = angular.element($event.currentTarget).attr("data-sort");
        $scope.sortReverse = !$scope.sortReverse;

        angular.element(document.querySelectorAll('.sort')).removeClass('asc desc');

        angular.element($event.currentTarget)
            .addClass(['asc','desc'][+ $scope.sortReverse])
            .removeClass(['asc','desc'][+ !$scope.sortReverse]);

        $scope.filterItems = $filter('orderBy')($scope.items, $scope.sortType, $scope.sortReverse);
        console.log($scope.filterItems)
    };

    $scope.firstPage = function() {
        return $scope.currentPage == 0;
    };

    $scope.lastPage = function() {
        let lastPageNum = Math.ceil($scope.filterItems.length / $scope.itemsPerPage - 1);
        return $scope.currentPage == lastPageNum;
    };

    $scope.getFilterItems = function() {
        return $filter('filter')($scope.filterItems, $scope.search)
    };

    $scope.numberOfPages = function() {
        return Math.ceil($scope.getFilterItems().length / $scope.itemsPerPage);
    };

    $scope.startingItem = function() {
        return $scope.currentPage * $scope.itemsPerPage;
    };

    $scope.pageBack = function() {
        $scope.currentPage = $scope.currentPage - 1;
    };

    $scope.pageForward = function() {
        $scope.currentPage = $scope.currentPage + 1;
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

    $scope.$watch('search', function(newValue, oldValue) {
        if (oldValue != newValue) {
            $scope.currentPage = 0;
            $scope.filterItems = $filter('filter')($scope.items, $scope.search);
        }
    }, true);
}
