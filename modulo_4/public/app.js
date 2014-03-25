var myAppModule = angular.module('app',['app.controllers','app.services']);

myAppModule.config(['$routeProvider', 
        function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'templates/list.html', 
                    controller: 'ListController'
                })
                .when('/edit/:employeeId', {
                    templateUrl: 'templates/employee.html', 
                    controller: 'EmployeeController'
                })
                .otherwise(
                    { redirectTo: '/' }
                );
        }
]);
