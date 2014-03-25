var controllers = angular.module('app.controllers',[]);

controllers.controller('ListController', function($scope, ListService){
    $scope.employees = ListService.getEmployees();
});

controllers.controller('EmployeeController', function($scope, EmployeeService, $routeParams){
    $scope.employee = EmployeeService.getEmployee($routeParams.employeeId);
    
    alert($scope.employee.name);

    $scope.updateEmployee = function() {
        //$scope.updatedEmployee = angular.copy($scope.employee);
        //alert('Controller: id ' + $scope.updatedEmployee.id + ' name ' + $scope.updatedEmployee.name);
        EmployeeService.updateEmployee($scope.employee);
    }
});
