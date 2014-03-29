var services = angular.module('app.services',[]);

services.service('ListService', function($http, $q){
    var ListService = {};
    ListService.getEmployees = function(){
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
    return ListService;
});

//services.service('EmployeeService', function($http, $q){
    //var EmployeeService = {};
    //EmployeeService.getEmployee = function(id){
        //var deferred = $q.defer();
        //$http.get("/employees/" + id, {"headers" : {"Accept" : "application/json"}})
            //.success(function(data){
                //deferred.resolve(data);
            //})
            //.error(function(){
                //deferred.reject("An error occured while fetching status");
            //});

        //return deferred.promise;
    //}

    //this.updateEmployee = function(employee){
        //alert('Service: employee.id ' + employee.id + 'employee.name ' + employee.name);
        //var deferred = $q.defer();
        //$http.put("/employees/" + employee.id, {"body" : {"name" : "pepe", "salary" : "9000000" }})
        //.success(function(data){
            //deferred.resolve(data);
        //})
        //.error(function(){
            //deferred.reject("An error occured while fetching status");
        //});
        //return deferred.promise;
    //}
    //return EmployeeService;
//});

services.factory('EmployeeService', function($http) {
    var EmployeeService = {
        getEmployee: function(id) {
            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get("/employees/" + id, {"headers" : {"Accept" : "application/json"}}).then(function (response) {
                // The then function here is an opportunity to modify the response
                console.log(response);
                // The return value gets picked up by the then in the controller.
                return response.data;
            });
            // Return the promise to the controller
            return promise;
        }
    };
    return EmployeeService;
});


//services.service('EmpleadoService',function($http, $q){
	//var EmpleadoService = {};
	//EmpleadoService.getEmpleado = function(id){
		//var deferred = $q.defer();
		//$http.get("/employees/" + id, {"headers" : {"Accept" : "application/json"}})
		//.success(function(data){
			//deferred.resolve(data);
		//})
		//.error(function(){
			//deferred.reject("An error occured while fetching status");
		//});
		
		//return deferred.promise;
	//}
	
	//EmpleadoService.updateEmpleado = function(){
        //alert('hola');
        ////alert($scope.empleado);
        ////alert('servicio EmpleadoService.updateEmpleado: ' + $scope.empleado.id);
		//var deferred = $q.defer();
		//$http.put("/employees/" + $scope.empleado.id, {"body" : {"name" : "pepe", "salary" : "9000000" }})
		//.success(function(data){
			//deferred.resolve(data);
		//})
		//.error(function(){
			//deferred.reject("An error occured while fetching status");
		//});
		
		//return deferred.promise;
	//}
	//return EmpleadoService;
//});
