var moduloCincoDeOro = (function() {
    ////////////////////////////////////////////////////////////////////////////////
    //                          'Clase' Bolillero
    ////////////////////////////////////////////////////////////////////////////////
    function Bolillero (totalBolillas, bolillasSorteo, tiempoEntreBolillas) {
        this.totalBolillas = totalBolillas;
        this.bolillasSorteo = bolillasSorteo;
        this.tiempoEntreBolillas = tiempoEntreBolillas * 1000;
        this.bolillero = [];
        this.finSorteo = false;
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
        //Para arreglar el contexto y no se pierda la referencia a this en la llamada a setInterval()
        //se pasa la referencia a this a una variable local
        var self = this;
        this.intervalID = setInterval(
                function() { 
                    self.sortear();
                    if (self.bolillero.length === self.bolillasSorteo) {
                        self.finSorteo = true;
                        clearInterval(self.intervalID);
                    }
                },
                this.tiempoEntreBolillas);
    }

    Bolillero.prototype.imprimir = function() {
        console.log('oro: ' + this.bolillero);
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                          'Clase' BolilleroRevancha
    ////////////////////////////////////////////////////////////////////////////////
    //Hereda de Bolillwro
    function BolilleroRevancha(totalBolillas, bolillasSorteo, tiempoEntreBolillas) {
        Bolillero.call(this, totalBolillas, bolillasSorteo, tiempoEntreBolillas);
    }

    BolilleroRevancha.prototype = new Bolillero();
    BolilleroRevancha.prototype.constructor = BolilleroRevancha;

    BolilleroRevancha.prototype.imprimir = function() {
        console.log('revancha: ' + this.bolillero);
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                          'Clase' Monitor
    ////////////////////////////////////////////////////////////////////////////////
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
                    var intervalIDMonitor = setInterval(
                        function() {
                            oro.imprimir();
                            revancha.imprimir();
                            console.log('--------------------------');
                            if (oro.finSorteo && revancha.finSorteo) {
                                console.log('FIN SORTEO!!!!');
                                clearInterval(intervalIDMonitor);
                            }
                        },
                        tiempo);
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
})();//Fin modulo moduloCincoDeOro

(function () {
    //Se inicia el monitor con frecuencia de 2 segundos
    var monitor = moduloCincoDeOro.monitor.getInstance(2);
    monitor.iniciarMonitor();
})();

//function incluirJQuery() {
    //var jq = document.createElement('script');
    //jq.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
    //document.getElementsByTagName('head')[0].appendChild(jq);
    //// ... give time for script to load, then type.
    //jQuery.noConflict();
//}
