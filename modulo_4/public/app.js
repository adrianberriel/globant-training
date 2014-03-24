var myAppModule = angular.module('CEPExample',['CEPExample.controllers','CEPExample.services']);

myAppModule.config(['$routeProvider', 
        function($routeProvider) {
            $routeProvider
                .when('/', { 
                    templateUrl: 'templates/list.html', 
                    controller: 'ListController'
                })
                .when('/edit/:employeeId', {
                    templateUrl: 'templates/edit.html', 
                    controller: 'EmployeeController'
                })
                .when('/prueba', {
                    templateUrl: 'templates/prueba.html', 
                    controller: 'PruebaController'
                })
                .otherwise(
                    { redirectTo: '/' }
                );
        }
]);
