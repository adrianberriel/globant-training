var moduloCincoDeOro = (function() {
    function Bolillero (totalBolillas, bolillasSorteo, tiempoEntreBolillas) {
        this.totalBolillas = totalBolillas;
        this.bolillasSorteo = bolillasSorteo;
        this.tiempoEntreBolillas = tiempoEntreBolillas * 1000;
        this.bolillero = [];
    }

    Bolillero.prototype.sortear = function() {
        var bolillaNoSirve = true;
        var bolilla;
        while (bolillaNoSirve) {
            bolilla = Math.floor(Math.random() * this.totalBolillas + 1);
            if (this.bolillero.indexOf(bolilla) === -1) {
                this.bolillero.push(bolilla);
                bolillaNoSirve = false;
            }
        }
    }

    Bolillero.prototype.initSorteo = function() {
        var self = this;//Para arreglar el contexto y no se pierda la referencia a this en la llamada a setInterval()
        this.intervalID = setInterval(
                function() { self.sortear(); },
                this.tiempoEntreBolillas);
    }

    Bolillero.prototype.imprimir = function() {
        console.log('oro: ' + this.bolillero);
    }

    function BolilleroRevancha(totalBolillas, bolillasSorteo, tiempoEntreBolillas) {
        Bolillero.call(this, totalBolillas, bolillasSorteo, tiempoEntreBolillas);
    }

    BolilleroRevancha.prototype = new Bolillero();
    BolilleroRevancha.prototype.constructor = BolilleroRevancha;

    BolilleroRevancha.prototype.imprimir = function() {
        console.log('revancha: ' + this.bolillero);
    }

    //Singleton pattern
    var Monitor = (function() {
        var instance;

        function init(tiempoMonitor) {
            var oro = new Bolillero(44, 6, 2);
            var revancha = new BolilleroRevancha(44, 5, 3);
            var tiempo = tiempoMonitor * 1000;
            return {
                iniciarMonitor: function() {
                    oro.initSorteo();
                    revancha.initSorteo();
                    setInterval(function() { oro.imprimir() }, tiempo);
                    setInterval(function() { revancha.imprimir() }, tiempo);
                }
            };
        };

        return {
            getInstance: function(tiempo) {
                if (!instance) {
                    instance = init(tiempo);
                }
                return instance;
            }
        };
    })();//Fin Monitor 

    return {
        monitor: Monitor
    };
})();

function probar() {
    var monitor = moduloCincoDeOro.monitor.getInstance(2);
    monitor.iniciarMonitor();
    //console.log(moduloCincoDeOro(2000).tiempo);
}

probar();

function pruebajquery() {
    var jq = document.createElement('script');
    jq.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(jq);
    // ... give time for script to load, then type.
    jQuery.noConflict();
}
