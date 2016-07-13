/*

*/

// Furnace
var Thermostat = require("./Thermostat.js");
var therm = new Thermostat(); //thermostat controlling furnace

therm.setThermostat(18);

var roomTemp = 20; //degrees C

var furnace = {state: 'ON', 
               isON: function() {return this.state == 'ON'},
               turnON: function() {this.state = 'ON'},
               turnOFF: function() {this.state = 'OFF'}
               };

therm.on("run", function() {
  if(!furnace.isON()) console.log("Furnace: ON");
  furnace.turnON(); 
});
therm.on("stop", function() {
  if(furnace.isON()) console.log("Furnace: OFF");
  furnace.turnOFF();
});


//Keep updating the temperature and tell thermostat
//what the temperature is
 
//start a timeout timer and recursively restart it each time.
setTimeout( function again(){
   if(furnace.isON()) roomTemp++;
   else roomTemp--;
   therm.temp(roomTemp); //tell thermostat the room temp
   console.log('TEMP: ' + roomTemp);
   setTimeout(again, 1000); //recursively restart timeout
   }, 1000);

