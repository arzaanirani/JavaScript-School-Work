/*
HTTPS Server

This server simulates a Thermostat that can be controlled by a client on a
browser, and relays information to a Furnace client. 

*/

//Cntl+C to stop server (in Windows CMD console)

var https = require('https'); // need for https communication
var http = require('http'); // need for http communication (Weather Network)
var fs = require('fs'); // need to read key and certificate files
var url = require('url');
var qstring = require('querystring');

//create an options object with the key and certificate of the server
var options = {
    key: fs.readFileSync('security/serverkey.pem'), 
    cert: fs.readFileSync('security/servercert.crt')
};

var temperature = 20;  //degrees celsius
var desiredTemp = 23;
var furnaceState = 'ON';
var weather = '';

var ROOT_DIR = 'html'; //dir to serve static files from

var MIME_TYPES = {
    'css': 'text/css',
    'gif': 'image/gif',
    'htm': 'text/html',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'text/javascript', //should really be application/javascript
    'json': 'application/json',
    'png': 'image/png',
    'txt': 'text/text'
};

var get_mime = function(filename) {
    var ext, type;
    for (ext in MIME_TYPES) {
        type = MIME_TYPES[ext];
        if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
            return type;
        }
    }
    return MIME_TYPES['txt'];
};

/* getWeather starts a chain of events that results in getting weather data
   from 'api.openweathermap.org'. getWeather specifically asks for the
   weather data from the website.
*/
function getWeather(city, res){

// new as of 2015: you need to provide an appid with your request
  var options = {
    host: 'api.openweathermap.org',
    path: '/data/2.5/weather?q=' + city + 
    '&appid=ddb39b53f527ac3f17baea4232fe9818'
  };
  http.request(options, function(weatherResponse){
    parseWeather(weatherResponse, res);
  }).end();
}

/* parseWeather accepts the weather information from 'api.openweathermap.org'
   and formats it for use.
*/
function parseWeather(weatherResponse, res) {
  var weatherData = '';
  
  weatherResponse.on('data', function (chunk) {
    weatherData += chunk;
  });
  
  weatherResponse.on('end', function () {
    jsonWeatherObj = JSON.parse(weatherData);
    descObj = jsonWeatherObj.weather[0];

    var weatherDataFormatted = {general: descObj.main, desc: descObj.description, main: jsonWeatherObj.main};

    sendResponse(JSON.stringify(weatherDataFormatted), res);
  });
}

/* sendResponse is used to send the weather data to the client (browser).
*/
function sendResponse(weatherData, res){
  res.end(weatherData);
}

/* Logs the temperature once a second. 
*/
setInterval(function(){
   console.log('temperature: ' + temperature);

}, 1000);

/* Creates an https server that uses certificates and keys found
   in the security folder.
*/
https.createServer(options, function (request, response){
     var jsonData = '';
     var urlObj = url.parse(request.url, true, false);

     /* Handles any GET requests given by a client.
     */
     if (request.method == "GET") {
        console.log("\n==============");

        console.log("GET");
        console.log(request.url);

        var filePath = ROOT_DIR + urlObj.pathname;
        if(urlObj.pathname === '/') filePath = ROOT_DIR + '/index.html';

        console.log("PATHNAME: " + urlObj.pathname);
        console.log("REQUEST: " + ROOT_DIR + urlObj.pathname);
        console.log("METHOD: " + request.method);

        fs.readFile(filePath, function(err,data){
         if(err){
            //report error to console
            console.log('ERROR: ' + JSON.stringify(err));
            //respond with not found 404 to client
            response.writeHead(404);
            response.end(JSON.stringify(err));
            return;
          }

          response.writeHead(200, {'Content-Type': get_mime(filePath)});
          response.end(data);
        });

        console.log("==============\n");
        
        return;
     }

     request.on('data', function(chunk) {
        jsonData += chunk;
     });

     request.on('end', function(){
    
      if (request.method == "POST") {
     
        if(request.url == "/getTemp/") {
          response.writeHead(200);
          response.end(JSON.stringify({
            temperature:temperature,
            desired: desiredTemp,
            furnaceState: furnaceState
          }));
        } 

        if(request.url == '/updateTemp/'){
          var reqObj = JSON.parse(jsonData);
          
          if(reqObj.type == 'increase'){
            desiredTemp = desiredTemp + 1;
            console.log("Desired temperature increased to: " + desiredTemp);
          }

          if(reqObj.type == 'decrease'){
            desiredTemp = desiredTemp - 1;
            console.log("Desired temperature descreased to: " + desiredTemp);
          }

          var resObj = {
            'temperature' : temperature,
            'desiredTemp': desiredTemp,
            'operation': reqObj.type
          }
          
          response.end(JSON.stringify(resObj));
        }

        if(request.url == '/getWeather/'){
          getWeather('Ottawa', response);
        }

        if(request.url == "/"){
            var reqObj = JSON.parse(jsonData);

          console.log('\nreqObj: ', reqObj);
          console.log('jsonData: ', jsonData );
          console.log('typeof jsonData: ', typeof jsonData, "\n");
          temperature = reqObj.temperature;
          
          /* Checks if current temperature is higher or lowser then the 
             desired temp. If higher, then the furnace is shut off, and if
             one degree lower than the desired temp, then the furnace is turned
             on. 
          */
          if (temperature > desiredTemp) {
            furnaceState = 'OFF';
            console.log("\nTurn Furnace Off");
            console.log("Update furnaceState: "+furnaceState+"\n");
          } else if (temperature < desiredTemp - 1) {
            furnaceState = 'ON';
            console.log("\nTurn Furnace On");
            console.log("Update furnaceState: "+furnaceState+"\n");
          }

          /* sends current temperature and furnace state to the Furnace.
          */
          var resObj = {
            'temperature' : temperature,
            'furnace' : furnaceState};
            response.end(JSON.stringify(resObj));
          }
        }

     });

 }).listen(3000);

console.log('Server Running at https://127.0.0.1:3000  CNTL-C to quit');



