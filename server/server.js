const express = require('express');
const http = require('http');
const socket = require('socket.io');

// initializes a port number
const PORT = 3000;

// initializes an express app
const app = express();

// gets http Server module and creates a server with the express app
const httpServer = http.Server;
const server = httpServer(app);

// initializes a socket using the server
const io = socket(server);


// on socket connection
io.on('connection', function (socket) {
    console.log('IO connection enabled...');
    socket.on('new_message', function (message) {
        console.log('NEW MESSAGE: ', message);
        io.emit('receive_message', message);
    })
})

// on listening to the server
server.listen(PORT, function () {
    console.log('Listening to port ' + PORT);
})
