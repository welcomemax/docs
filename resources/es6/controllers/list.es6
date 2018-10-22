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

    $scope.current = {};
    $scope.filterTags = {};
    $scope.filterItems = $scope.items;
    $scope.currentPage = 0;
    $scope.itemsPerPage = 5;
    $scope.search = '';

    $scope.toggleSort = ($event) => {
        $scope.sortType = angular.element($event.currentTarget).attr("data-sort");
        $scope.sortReverse = !$scope.sortReverse;

        angular.element(document.querySelectorAll('.sort')).removeClass('asc desc');

        angular.element($event.currentTarget)
            .addClass(['asc','desc'][+ $scope.sortReverse])
            .removeClass(['asc','desc'][+ !$scope.sortReverse]);

        $scope.filterItems = $filter('orderBy')($scope.items, $scope.sortType, $scope.sortReverse);
        console.log($scope.filterItems)
    };

    $scope.firstPage = () => {
        return $scope.currentPage == 0;
    };

    $scope.lastPage = () => {
        let lastPageNum = Math.ceil($scope.filterItems.length / $scope.itemsPerPage - 1);
        return $scope.currentPage == lastPageNum;
    };

    $scope.getFilterItems = () => {
        return $filter('filter')($scope.filterItems, $scope.search)
    };

    $scope.numberOfPages = () => {
        return Math.ceil($scope.getFilterItems().length / $scope.itemsPerPage);
    };

    $scope.startingItem = () => {
        return $scope.currentPage * $scope.itemsPerPage;
    };

    $scope.pageBack = () => {
        $scope.currentPage -= $scope.currentPage;
    };

    $scope.pageForward = () => {
        $scope.currentPage += $scope.currentPage;
    };

    $scope.filterTag = ($event, tag, type) => {
        $scope.filterTags[tag] = !$scope.filterTags[tag];

        if (type === 'product' || type === 'type') {
            $scope.filterTags[$scope.current[type]] = false;
            angular.element($event.currentTarget).parent().parent().find('li').removeClass('tags-item-active');

            $scope.current[type] = tag;
        }

        angular.element($event.currentTarget).parent().toggleClass('tags-item-active');

        $scope.filterItems = $scope.items.filter((item) => {
            return $scope.filterTags[tag] ? item.tags.includes(tag) : true;
        })
    };

    $scope.copied = (e) => {
        let isBtn = e.trigger.tagName === 'BUTTON';
        let btn = isBtn ? angular.element(e.trigger) : angular.element(e.trigger).find('button');

        btn.text('Copied');
        setTimeout(() => {
            btn.text('Copy');
        }, 5000)
    };

    $scope.$watch('search', (newValue, oldValue) => {
        if (oldValue !== newValue) {
            $scope.currentPage = 0;

            $scope.filterItems = $scope.items.filter((item) => {
                if ($scope.search === '') {
                    return true;
                }

                // @TODO separate words search (any order)
                return $scope.search.split(' ').every((word) => {
                    return !![item.title, item.caption, item.data].indexOf(word);
                })
            });
        }
    }, true);
}
