const ws = require('websocket');
const net = require('net');
var WebSocketServer = ws.server;
const http = require('http');

  var server = http.createServer(function(request, response) {});
  server.listen(1337, function() {
      console.log((new Date()) + " Server is listening on port "
        + 1337);
   });
  
  wsServer = new WebSocketServer({
      httpServer: server
    });
  
  
  var flag = false; 
  
  var clients = []

  var client = net.createConnection({ port: 8080 }, () => {
    // 'connect' listener
    console.log('connected to server!');
  });
  client.on('data', function(data){
      console.log(data.toString('utf8'));
  });
  
  wsServer.on('request', function(request) {
        console.log((new Date()) + ' Connection from origin '
            + request.origin + '.');
  
        var connection = request.accept(null, request.origin);
        clients.push(connection);
        connection.on('message', function(message) {
            client.write(message.utf8Data.concat('\n'));
      });
  });