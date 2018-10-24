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
import listController from './controllers/list.es6';
import detailController from './controllers/detail.es6';
import editController from './controllers/edit.es6';

// directives
import tagsDirective from './directives/tags.es6';
import editorDirective from './directives/editor.es6';

// templates
import listTemplate from './../html/list.html';
import detailTemplate from './../html/detail.html';
import editTemplate from './../html/edit.html';

angular.module('items', ['ngRoute', 'ngclipboard'])
    .factory('api', apiService)
    .controller('listController', listController)
    .controller('detailController', detailController)
    .controller('editController', editController)
    .directive('tags', tagsDirective)
    .directive('editor', editorDirective)
    .filter('startFromFilter', startFromFilter)
    .filter('rawHtmlFilter', rawHtmlFilter)
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'listController',
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
                controller: 'detailController',
                template: detailTemplate,
                resolve: {
                    itemObj: function ($route, api) {
                        let id = $route.current.params.id;
                        return api.call(`items/${id}`);
                    }
                }
            })
            .when('/edit/:id', {
                controller: 'editController',
                templateUrl: editTemplate,
                resolve: {
                    itemObj: function ($route, api) {
                        let id = $route.current.params.id;
                        return id ? api.call(`items/${id}`) : null
                    }
                }
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
    )
    .run(/** @ngInject */ function($rootScope) {
        $rootScope.loaded = true;
    });
