export default /** @ngInject */ function($injector) {
    class Api{
        constructor($injector) {
            this.$http = $injector.get('$http');
            this.$q = $injector.get('$q');
            this.$location = $injector.get('$location');
            this.$httpParamSerializer = $injector.get('$httpParamSerializer');
            this.$rootScope = $injector.get('$rootScope');
            this.apiBaseUrl = '/api/';
        }

        request(url, method = 'get', data = {}, externalDef) {
            let def = externalDef || this.$q.defer();
            let requestOptions = {
                method: method,
                url: this.apiBaseUrl + url.replace(/^\/|\/$/g, ''),
            };

            if (method.toLowerCase() === 'get') {
                requestOptions.params = data;
            } else {
                requestOptions.data = data ? this.$httpParamSerializer(data) : data;
                requestOptions.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
            }

            this.$http(requestOptions).then((result) => {
                if (!result.data) {
                    def.reject({
                        status: 0,
                        reason: 'UNEXPECTED'
                    });
                } else if (!result.data.status) {
                    def.reject(result.data);
                } else {
                    def.resolve(result.data);
                }
            }, (result) => {
                def.reject({
                    status: 0,
                    reason: 'HTTP_ERROR',
                    data: {
                        status: result.status,
                        statusText: result.statusText
                    }
                });
            });

            return def.promise;
        }

        parseCallArguments(url, data) {
            let urlParams = [];
            let parsedData = {};

            url = url.replace(/\{[^}]+}/g, (match) => {
                let name = match.substr(1, match.length - 2);

                urlParams.push(name);

                return data[name];
            });

            angular.forEach(data, (val, key) => {
                if (!~urlParams.indexOf(key)) {
                    parsedData[key] = val;
                }
            });

            return [url, parsedData];
        }

        call(endpoint, method = 'get', data = {},  def) {
            def = def || this.$q.defer();

            if (!endpoint) {
                def.reject({
                    status: 0,
                    reason: 'UNDEFINED_ENDPOINT'
                })
            } else {
                let [parsedUrl, parsedData] = this.parseCallArguments(endpoint, data);

                this.request(parsedUrl, method, parsedData, def);
            }
            return def.promise;
        }
    }

    return new Api($injector);
};
