var services = angular.module('CEPExample.services',[]);

services.service('ListService',function($http, $q){
	var EmpleadosService = {};
	EmpleadosService.getEmpleadosList = function(){
		var deferred = $q.defer();
		$http.get("/employees", {"headers" : {"Accept" : "application/json"}})
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject("An error occured while fetching status");
		});
		
		return deferred.promise;
	}
	
	return EmpleadosService;
});

services.service('EmpleadoService',function($http, $q){
	var EmpleadoService = {};
	EmpleadoService.getEmpleado = function(id){
		var deferred = $q.defer();
		$http.get("/employees/" + id, {"headers" : {"Accept" : "application/json"}})
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject("An error occured while fetching status");
		});
		
		return deferred.promise;
	}
	
	EmpleadoService.updateEmpleado = function(){
        alert('hola');
        //alert($scope.empleado);
        //alert('servicio EmpleadoService.updateEmpleado: ' + $scope.empleado.id);
		var deferred = $q.defer();
		$http.put("/employees/" + $scope.empleado.id, {"body" : {"name" : "pepe", "salary" : "9000000" }})
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(){
			deferred.reject("An error occured while fetching status");
		});
		
		return deferred.promise;
	}
	return EmpleadoService;
});
