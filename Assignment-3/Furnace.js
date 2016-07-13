
/*
HTTPS

A client for the Thermostat.js server.

*/


var https = require('https'); //need to https communication
var fs = require('fs'); //need to read key and certificate files

var furnaceState;
var temperature = 20;

var options = {
  //OPTIONS FOR HTTPS
  //note that the furnace has its own key and certificate needed for secure communication
  key: fs.readFileSync('security/clientkey.pem'), 
  cert: fs.readFileSync('security/clientcert.crt'),
  //this setting is needed to ensure that the furnace does not reject the certificate of the thermostat server due to the 
  //fact that it is self-signed
  rejectUnauthorized: false,
  hostname: 'localhost',
  port: '3000',
  path: '/',
  method: 'POST'
};


function readJSONResponse(response){
  var responseData = '';
  response.on('data', function(chunk){responseData += chunk});
  response.on('end', function(){
    var dataObj = JSON.parse(responseData);
    
    console.log("\n===== New Response =====")

    console.log('Raw Response: ' + responseData);
    
    temperature = parseInt(dataObj.temperature);
    console.log('TEMPERATURE: '+temperature);

    furnaceState = dataObj.furnace;
    console.log('FURNACE STATE: '+furnaceState);

    console.log("===== Response End =====\n")

  });
}

/* Updates the temperature when the furnaceState is 'ON'. This was implemented using
   a timer because it was thought to be more realistic to how a furnace would heat
   (ie. The furnace heats independently of the Thermostat, and the Thermostat reads
   the updates as they occur). The cooling also happens here.
*/
setInterval(function() {
  if (furnaceState === 'ON') {
      temperature++;
      console.log("Heat");
  } else {
    temperature--;
  }
}, 4000)

setInterval(function(){
  //use https, not http, for request to server
  var req = https.request(options, readJSONResponse);

  //write a json string
  req.write(JSON.stringify({"temperature" : temperature, "furnace": furnaceState}));
  req.end();
}, 5000);
