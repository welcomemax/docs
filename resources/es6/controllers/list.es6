export default /** @ngInject */ function (itemsObj, productsObj, typesObj, tagsObj, $scope, $filter, $window) {
    $scope.items = itemsObj.data;

    productsObj.data.forEach((product) => {
        $scope.products = $scope.products || [];

        $scope.products.push(product)
    });

    typesObj.data.forEach((type) => {
        $scope.types = $scope.types || [];

        $scope.types.push(type)
    });

    tagsObj.data.forEach((tag) => {
        $scope.tags = $scope.tags || [];

        $scope.tags.push(tag)
    });

    $scope.items.forEach((item) => {
        item.tags = item.tags || [];

        item.tags.push(item.type);
        item.product && item.tags.push(item.product);
    });

    $scope.sortType = 'id';
    $scope.sortReverse = false;

    $scope.current = {};
    $scope.filterTags = new Set();
    $scope.filterItems = $scope.items;
    $scope.currentPage = 0;
    $scope.itemsPerPage = 5;
    $scope.search = '';

    // @TODO render sorter (rating, views)
    $scope.toggleSort = ($event) => {
        $scope.sortType = angular.element($event.currentTarget).attr("data-sort");
        $scope.sortReverse = !$scope.sortReverse;

        angular.element(document.querySelectorAll('.sort')).removeClass('asc desc');

        angular.element($event.currentTarget)
            .addClass(['asc','desc'][+ $scope.sortReverse])
            .removeClass(['asc','desc'][+ !$scope.sortReverse]);

        $scope.filterItems = $filter('orderBy')($scope.items, $scope.sortType, $scope.sortReverse);
    };

    // its used somewhere?
    $scope.getFilterItems = () => {
        return $filter('filter')($scope.filterItems, $scope.search)
    };

    // @TODO make smart object or factory for paginate
    $scope.paginate = () => {
        this.page = 0;
    };

    $scope.firstPage = () => {
        return $scope.currentPage == 0;
    };

    $scope.lastPage = () => {
        let lastPageNum = Math.ceil($scope.filterItems.length / $scope.itemsPerPage - 1);
        return $scope.currentPage == lastPageNum;
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

    $scope.copied = (e) => {
        let isBtn = e.trigger.tagName === 'BUTTON';
        let btn = isBtn ? angular.element(e.trigger) : angular.element(e.trigger).find('button');

        btn.text('Copied');
        setTimeout(() => {
            btn.text('Copy');
        }, 5000)
    };

    $scope.filterTag = ($event, tag, type) => {
        let $tagItem = angular.element($event.currentTarget).parent();

        if (type === 'product' || type === 'type') {
            if (type in $scope.current && $scope.current[type] !== tag && $scope.filterTags.has($scope.current[type])) {
                $scope.filterTags.delete($scope.current[type]);
            }

            $tagItem.parent().find('li').removeClass('tags-item-active');
        }

        $scope.filterTags.has(tag) ? $scope.filterTags.delete(tag) : $scope.filterTags.add(tag);

        if (type === 'product' || type === 'type') {
            if ($scope.current[type] !== tag) {
                $scope.current[type] = tag;
                $tagItem.addClass('tags-item-active');
            } else {
                delete $scope.current[type];
            }
        } else {
            $tagItem.toggleClass('tags-item-active');
        }

        let filterTagsArray = Array.from($scope.filterTags);

        return $scope.filterItems = $scope.items.filter((item) => {
            return filterTagsArray.every((filterTag) => {
                return !!filterTag ? item.tags.includes(filterTag) : false;
            });
        })
    };

    $scope.$watch('search', (newValue, oldValue) => {
        if (oldValue !== newValue) {
            $scope.currentPage = 0;

            if ($scope.search === '') {
                return $scope.filterItems = $scope.items;
            }

            // @FIXME drop filters or attach filterTag
            // $scope.cleanFilters();

            return $scope.filterItems = $scope.items.filter((item) => {
                // @FIXME separate words search (any order)
                return $scope.search.split(' ').some((word) => {
                    // @TODO replace with Array.includes
                    return !![item.title, item.caption, item.data].indexOf(word);
                })
            });
        }
    }, true);

    $scope.cleanFilters = () => {
        $scope.current = {};
        $scope.filterTags = new Set();

    }
}
