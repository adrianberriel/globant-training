var services = angular.module('CEPExample.services',[]);
services.service('EmpleadosService',function($http, $q){
	var EmpleadosService = {};
	EmpleadosService.getEmpleadosList = function(){
		var deferred = $q.defer();
		$http.get("/employees",{"headers" : {"Accept" : "application/json"}})
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