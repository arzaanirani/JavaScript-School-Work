/*
*/

// Furnace.js
//var util = require("util");

var thermostat;
var isRunning;

var Class = function(therm) {
   thermostat = therm;
   isRunning = false; 

   therm.on("run", function() {
     if(!isRunning ) console.log("Furnace: ON");
     isRunning = true; 
    });

    therm.on("stop", function() {
      if(isRunning) console.log("Furnace: OFF");
      isRunning = false;
    });

}

Class.prototype.isON = function() {
     return isRunning;
};
Class.prototype.isOFF = function() {
     return isRunning;
};


module.exports = Class; 