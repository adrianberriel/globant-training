var controllers = angular.module('CEPExample.controllers',[],function(){});
controllers.controller('EmpleadosController',function($scope, EmpleadosService){
	/*$scope.empleados = [
		{ id: 1, name: 'juanjo', salary: 1000 },
		{ id: 2, name: 'pepe', salary: 2000 },
		{ id: 3, name: 'lito', salary: 3000 }
	];*/
	$scope.empleados = EmpleadosService.getEmpleadosList();
});