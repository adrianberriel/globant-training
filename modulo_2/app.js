//Datos de prueba
var empleados = {
    '1001' : {
        nombre: 'Juan',
        salario: 23400 
    },
    '1002' : { 
        nombre: 'Pedro',
        salario: 32200
    },
    '1003' : { 
        nombre: 'Martin',
        salario: 39430 
    }
}

var express = require('express');
var app = express();
var js2xmlparser = require("js2xmlparser");


app.get('/empleados', function(req, res){
    switch (req.get('accept')) {
        case 'application/json':
            res.send(empleados);
            break;
        case 'application/xml':
        case 'text/xml':
            res.set('Content-Type', 'text/xml');
            res.send(js2xmlparser('empleados', empleados));
            break;
        default:
            res.send(406, { 'error' : 'campo accept invalido' });
            break;
    }
});

app.get('/empleado/:id', function(req, res){
    var id = req.params.id;
    var empleado = empleados[id];
    switch (req.get('accept')) {
        case 'application/json':
            if (empleado !== undefined) {
                res.send(empleado);
            }
            break;
        case 'application/xml':
        case 'text/xml':
            res.set('Content-Type', 'text/xml');
            res.send(js2xmlparser('empleados', empleado));
            break;
        default:
            res.send(406, { 'error' : 'campo accept invalido' });
            break;
    }
    res.send(404, { 'error' : 'empleado no encontrado' });
});

app.post('/crear', function(req, res){
    var empleadosNuevos;
    switch (req.get('accept')) {
        case 'application/json':
            if (req.get('content-type') === 'application/json') {
                empleadosNuevos = req.body;
                for (var e in empleadosNuevos) {
                    console.log(e);
                    empleados[e] = { 'nombre' : e['nombre'], 'salario' : e['salarioi'] }
                }
            }
            res.send(empleados);
            break;
        case 'application/xml':
        case 'text/xml':
            res.set('Content-Type', 'text/xml');
            res.send(js2xmlparser('empleados', empleado));
            break;
        default:
            res.send(406, { 'error' : 'campo accept invalido' });
            break;
    }
    res.send(404, { 'error' : 'empleado no encontrado' });
});


app.listen(3000);
console.log('Listening on port 3000...');
