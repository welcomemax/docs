// vendors
import 'angular';
import 'angular-route';
import 'ngclipboard';

// filters
import rawHtmlFilter from './filters/raw-html.es6';
import startFromFilter from './filters/start-from.es6';

// services
import apiService from './services/api.es6';

// controllers
import itemsListController from './controllers/items-list.es6';
import itemDetailController from './controllers/item-detail.es6';

// directives
import tagsDirective from './directives/tags.es6';
import editorDirective from './directives/editor.es6';

// templates
import listTemplate from './../html/list.html';
import detailTemplate from './../html/detail.html';

angular.module('items', ['ngRoute', 'ngclipboard'])
    .factory('api', apiService)
    .controller('itemsListController', itemsListController)
    .controller('itemDetailController', itemDetailController)
    .directive('tags', tagsDirective)
    .directive('editor', editorDirective)
    .filter('startFromFilter', startFromFilter)
    .filter('rawHtmlFilter', rawHtmlFilter)
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'itemsListController',
                template: listTemplate,
                resolve: {
                    itemsObj: function (api) {
                        return api.call('items');
                    },
                    productsObj: function (api) {
                        return api.call('products');
                    },
                    typesObj: function (api) {
                        return api.call('types');
                    }
                }
            })
            .when('/detail/:id', {
                controller: 'itemDetailController',
                template: detailTemplate,
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
