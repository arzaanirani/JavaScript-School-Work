

var util = require('util'); //needed for inherits
var EventEmitter = require('events').EventEmitter;

var furnaceIsOn = false;

var Class = function(therm) { 
    
    util.inherits(Class, EventEmitter);

    therm.on("run", function() {
        console.log("Furnace: ON");
        furnaceIsOn = true;
    });

    therm.on("stop", function() {
        console.log("Furnace: OFF");
        furnaceIsOn = false;
    });
}

Class.prototype.isON = function() {
    return furnaceIsOn;
}

module.exports = Class;
//console.log(module.exports);