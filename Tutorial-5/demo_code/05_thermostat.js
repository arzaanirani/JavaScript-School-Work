/*
The Heat Is On
*/

// 
var Thermostat = require("./Thermostat.js");
var therm = new Thermostat(); //thermostat controlling furnace

therm.setThermostat(18);

var roomTemp = 20; //degrees C

var furnaceIsOn = false; //temporary boolean to represent
                         //furnace for now

therm.on("run", function() {
  console.log("Furnace: ON");
  furnaceIsOn = true;
});
therm.on("stop", function() {
  console.log("Furnace: OFF");
  furnaceIsOn = false;
});


//Keep updating the temperature and tell thermostat
//what the temperature is
 
//start a timeout timer and recursively restart it each time.
setTimeout( function again(){
   if(furnaceIsOn ) roomTemp++;
   else roomTemp--;
   therm.temp(roomTemp); //tell thermostat the room temp
   console.log('TEMP: ' + roomTemp);
   setTimeout(again, 1000); //recursively restart timeout
   }, 1000);

