var controllers = angular.module('app.controllers',[]);

//var employeeList;

controllers.controller('ListController', function($scope, ListService, $routeParams){
    $scope.employees = ListService.getEmployees();
    //employeeList = angular.copy($scope.employees);
    //alert('ListController');
});

controllers.controller('EmployeeController', function($scope, EmployeeService, $routeParams){
    $scope.employee = EmployeeService.getEmployee($routeParams.employeeId);
    //alert(employeeList[0]);


    //$scope.employee = { id: 1, name: "asdasdas", salary: 200012 };
    //$scope.employee = employeeList[$routeParams.employeeId];
    //$scope.employee = angular.copy(employee);
    //$scope.employee = angular.copy($scope.employees);

    //promise.then(function(data) {
        //$scope.employee = data;
    //});

    $scope.updateEmployee = function() {
        //$scope.updatedEmployee = angular.copy($scope.employee);
        //alert('Controller: id ' + $scope.updatedEmployee.id + ' name ' + $scope.updatedEmployee.name);
        EmployeeService.updateEmployee($scope.employee);
    }
});
