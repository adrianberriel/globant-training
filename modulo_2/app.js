//Datos de prueba
var empleados = [
{
    id: 1001,
    nombre: 'Juan',
    salario: 23400 
},
{ 
    id: 1002,
    nombre: 'Pedro',
    salario: 32200
},
{ 
    id: 1003,
    nombre: 'Martin',
    salario: 39430 
}
];

var express = require('express');
var js2xmlparser = require("js2xmlparser");
var xml2js = require('xml2js');

var app = express();

app.get('/', function(req, res) {
    console.log(parsearEmpleados(req, empleados));
    res.send(parsearEmpleados(req, empleados));
});

app.use(function(req, res, next) {
    req.rawBody = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        req.rawBody += chunk;
    });
    req.on('end', function() {
        next();
    });
});

function rawBodyToContentType(req) {
    var body = req.rawBody;
    var datosJson;
    var contentType = req.get('Content-type');
    switch (contentType) {
        case 'application/json':
            datosJson = JSON.parse(body);
            break;
        case 'application/xml':
        case 'text/xml':
            xml2js.parseString(body, function (err, result) {
                datosJson = result;
            });
            break;
    }
    return datosJson;
}

function parsearEmpleados(req, emp) {
    var accept = req.get('accept');
    if (accept == 'application/xml' || accept == 'text/xml') {
        var options = {
            wrapArray: true,
            elementName: 'Empleado'
        }
        return js2xmlparser('empleados', emp, options);
    }
    return emp;
}

app.put('/actualizar', function(req, res){
    var empAct = rawBodyToContentType(req);
    empAct = empAct['empleados']['empleado'];
    var empViejos = empleados['empleados']['empleado'];
    for (var emp in empAct) {
        var empId = empAct[emp]['id'];
        var actual = empAct[emp];
        for (var viejo in empViejos) {
            var empIdViejo = empViejos[viejo]['id'];
            var empViejo = empViejos[viejo];
            if (empId == empIdViejo) {
                empViejos[viejo] = actual;
            }
        }
    }
    res.send(parsearEmpleados(req, empleados));
});

app.post('/crear', function(req, res){
    var empNuevos = rawBodyToContentType(req);
    empNuevos = empNuevos['empleados']['empleado'];
    var empViejos = empleados['empleados']['empleado'];
    empleados['empleados']['empleado'] = empViejos.concat(empNuevos);

    res.send(parsearEmpleados(req, empleados));
});

app.delete('/eliminar/:id', function(req, res){
    var id = req.params.id;
    var listaEmpleados = empleados['empleados']['empleado'];
    //var empleado;
    for (var emp in listaEmpleados) {
        var empId = listaEmpleados[emp]['id'];
        if (id == empId) {
            //empleado = listaEmpleados[emp];
            //delete empleado;
            delete empleados[listaEmpleados[emp]];
            res.send(parsearEmpleados(req, empleados));
        }
    }
    res.send(406, 'Empleado no encontrado');
});

app.get('/empleados', function(req, res){
    var emp = empleados;
    res.send(parsearEmpleados(req, emp));
});

app.get('/empleado/:id', function(req, res){
    var id = req.params.id;
    var listaEmpleados = empleados['empleados']['empleado'];
    var empleado;
    for (var emp in listaEmpleados) {
        var empId = listaEmpleados[emp]['id'];
        if (id == empId) {
            empleado = listaEmpleados[emp];
            res.send(parsearEmpleados(req, empleado));
        }
    }
    res.send(406, 'Empleado no encontrado');
});

app.listen(3000);
console.log('Listening on port 3000...');
