const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');

// initializes a port number
const PORT = 8080;

// initializes an express app
const app = express();

// gets http Server module and creates a server with the express app
const httpServer = http.Server;
const server = httpServer(app);

// initializes a socket using the server
const io = socket(server);

// on listening to the server
server.listen(PORT, function () {
    console.log('Listening to port ' + PORT);
})

app.use('/', express.static(path.join(__dirname, 'build')));

// on socket connection
io.on('connection', function (socket) {
    console.log('Running socket.io in server...');

    socket.on('new_message', function (message) {
        console.log('RECEIVED: ', message);
        io.emit('message_received', message)
    });
});


