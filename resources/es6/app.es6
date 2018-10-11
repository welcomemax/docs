// vendors
import 'angular';
import 'angular-route';

// filters
import rawHtmlFilter from './filters/raw-html.es6';
import startFromFilter from './filters/start-from.es6';

// services
import apiService from './services/api.es6';

// controllers
import itemsListController from './controllers/items-list.es6';
import itemDetailController from './controllers/item-detail.es6';

angular.module('items', ['ngRoute'])
    .factory('api', apiService)
    .controller('itemsListController', itemsListController)
    .controller('itemDetailController', itemDetailController)
    .filter('startFromFilter', startFromFilter)
    .filter('rawHtmlFilter', rawHtmlFilter)
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'itemsListController',
                templateUrl: '../templates/list.html',
                resolve: {
                    itemsObj: function (api) {
                        return api.call('items');
                    },
                    // appsObj: function (api) {
                    //     return api.call('apps');
                    // },
                    // typesObj: function (api) {
                    //     return api.call('types');
                    // }
                }
            })
            .when('/detail/:id', {
                controller: 'itemDetailController',
                templateUrl: '../templates/detail.html',
                resolve: {
                    itemObj: function ($route, api) {
                        return api.call('items/' + $route.current.params.id);
                    }
                }
            })
            .when('/new', {
                controller: 'itemDetailController',
                templateUrl: '../templates/detail.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(
        ['$locationProvider', function($locationProvider) {
            $locationProvider.hashPrefix('');
        }],
        ['$qProvider', function ($qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
        }]
    );
