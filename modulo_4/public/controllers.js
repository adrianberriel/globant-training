//var controllers = angular.module('CEPExample.controllers',[],function(){});
var controllers = angular.module('CEPExample.controllers',[]);

controllers.controller('ListController', function($scope, ListService){
    $scope.empleados = ListService.getEmpleadosList();
});

controllers.controller('EmployeeController', function($scope, EmpleadoService, $routeParams){
    $scope.empleado = EmpleadoService.getEmpleado($routeParams.employeeId);
    //$scope.updateEmpleado = function() {
        //alert($scope.empleado.name);
        ////var e = angular.copy($scope.empleado);
        //EmpleadoService.updateEmpleado();
    //};
    $scope.updateEmpleado = EmpleadoService.updateEmpleado();
});

//controllers.controller('EditEmployeeController', function($scope, EmpleadoService){
    //alert('controller EditEmployeeController');
    //alert($scope.empleado);
    //$scope.update = EmpleadoService.updateEmpleado(empleado);
//});

controllers.controller('PruebaController', function($scope){
    $scope.message = 'hola';
});
