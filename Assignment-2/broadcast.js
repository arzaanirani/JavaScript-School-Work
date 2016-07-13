/*
	Our broadcast module. This module takes in a message
	and the Web Socket Server used elsewhere and sends messages
	to all the clients currently connected to the surver.
*/

function broadcast(wss, msg) {
  wss.clients.forEach(function(client) {
    client.send(msg);
  });
}

module.exports = broadcast;