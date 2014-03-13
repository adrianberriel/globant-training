
function Bolillero (totalBolillas, bolillasSorteo, tiempoEntreBolillas) {
    this.totalBolillas = totalBolillas;
    this.bolillasSorteo = bolillasSorteo;
    this.tiempoEntreBolillas = tiempoEntreBolillas * 1000;
    this.bolillero = [];
}

Bolillero.prototype.hola = function() {
    console.log('bolillero comun');
    console.log(this.tiempoEntreBolillas);
}

Bolillero.prototype.sortear = function() {
    var bolillaNoSirve = true;
    var bolilla;
    while (bolillaNoSirve) {
        bolilla = Math.floor(Math.random() * this.totalBolillas + 1);
        //Si la bolilla no esta me sirve
        if (this.bolillero.indexOf(bolilla) === -1) {
            this.bolillero.push(bolilla);
            bolillaNoSirve = false;
        }
    }
}

function OtroBolillero(totalBolillas, bolillasSorteo, tiempoEntreBolillas) {
    Bolillero.call(this, totalBolillas, bolillasSorteo, tiempoEntreBolillas);
}

OtroBolillero.prototype = new Bolillero();
OtroBolillero.prototype.constructor = OtroBolillero;

OtroBolillero.prototype.hola = function() {
    console.log('soy otro bolillero');
    console.log(this.tiempoEntreBolillas);
}

function probar() {
    var b1 = new Bolillero(44, 2, 3);
    var b2 = new OtroBolillero(44, 4, 5);

    //b1.hola();
    //b2.hola();
    b1.sortear();
    b1.sortear();
    b1.sortear();
    console.log(b1.bolillero);
}

probar();

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
    return bolillero;
}

function monitor(bolilleroTradicional, bolilleroRevancha) {
    console.log('oro: ', bolilleroTradicional);
    console.log('revancha: ', bolilleroRevancha);
    console.log('---------------------------');
}

function fin() {
    console.log('FIN SORTEO!!!');
}

function iniciar(bolillasTrad, bolillasRev, tiempoTrad, tiempoRevancha, tiempoMonitor) {
    var tiempoTrad = tiempoTrad * 1000;
    var tiempoRevancha = tiempoRevancha * 1000;
    var tiempoMonitor = tiempoMonitor * 1000;
    var bolilleroTradicional = [], bolilleroRevancha = [];

    var intervaloTrad = setInterval(sortear, tiempoTrad, bolilleroTradicional);
    var intervaloRev = setInterval(sortear, tiempoRevancha, bolilleroRevancha);
    var intervaloMonitor = setInterval(monitor, tiempoMonitor, bolilleroTradicional, bolilleroRevancha);

    var totalTradicional = tiempoTrad * (bolillasTrad + 1);
    var totalRevancha = tiempoRevancha * (bolillasRev + 1);
    //Detenemos los sorteos
    setTimeout(clearInterval, totalTradicional, intervaloTrad);
    setTimeout(clearInterval, totalRevancha, intervaloRev);

    //Apagamos con el tiempo mayor
    if (totalRevancha > totalTradicional) {
        setTimeout(clearInterval, totalRevancha, intervaloMonitor);
        setTimeout(fin, totalRevancha);
    } else {
        setTimeout(clearInterval, totalTradicional, intervaloMonitor);
        setTimeout(fin, totalTradicional);
    }
}

//iniciar(6, 5, 5, 8, 2);
