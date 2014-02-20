//////////////////////////////////////////
//Ejercicio 5 de Oro - Adrian Berriel
//////////////////////////////////////////
var bolilleroTradicional = [], bolilleroRevancha = [];

//Retorna entero aleatorio entre min y max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function sortear(bolillero) {
    var bolillaNoSirve = true;
    var bolilla;
    while (bolillaNoSirve) {
        bolilla = getRandomInt(1,44);
        //Si la bolilla no esta me sirve
        if (bolillero.indexOf(bolilla) === -1) {
            bolillero.push(bolilla);
            bolillaNoSirve = false;
        }
    }
    //console.log(sorteo + ': ' + bolillero);
    return bolillero;
}

function monitor() {
    console.log('oro: ', bolilleroTradicional);
    console.log('revancha: ', bolilleroRevancha);
    console.log('---------------------------');
}

//function detener(intervalo

function iniciar() {
    var tiempoTrad = 5000, tiempoRevancha = 8000,
        tiempoMonitor = 2000;
    var bolillasTrad = 6, bolillasRev = 5;

    var intervaloTrad = setInterval(sortear, tiempoTrad, bolilleroTradicional);
    var intervaloRev = setInterval(sortear, tiempoRevancha, bolilleroRevancha);
    var intervaloMonitor = setInterval(monitor, tiempoMonitor);

    var totalTradicional = tiempoTrad * (bolillasTrad);
    var totalRevancha = tiempoRevancha * (bolillasRev);
    //Detenemos los sorteos
    setTimeout(clearInterval, totalTradicional, intervaloTrad);
    setTimeout(clearInterval, totalRevancha, intervaloRev);

    totalRevancha > totalTradicional ? 
        setTimeout(clearInterval, totalRevancha, intervaloMonitor) : 
        setTimeout(clearInterval, totalTradicional, intervaloMonitor);

}

iniciar();
