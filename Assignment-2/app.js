/*
To run this app first execute
npm install
to load npm modules listed in package.json file

// Ask about using ecstatic -- is it allowed?

*/

var http = require('http');
var WebSocketServer = require('ws').Server;
var ecStatic = require('ecstatic');

/*
	Our module, which seperates the broadcast function
	from the current code.	
*/
var broadcast = require('./broadcast');

//static file server
var server = http.createServer(ecStatic({root: __dirname + '/www'}));

/*
	Creates a Web Socket Server using the ws module.
*/
var wss = new WebSocketServer({server: server});

/*
	Accepts messages from any client and broadcasts them back to all clients.
*/
wss.on('connection', function(ws) {
  console.log('Client connected');
  ws.on('message', function(msg) {
    console.log('Message: ' + msg);
    broadcast(wss, msg);
  });
});


server.listen(3000);
console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');
