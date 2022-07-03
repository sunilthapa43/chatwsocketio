const express = require('express');
const app =  express();

const http = require('http');
const server = http.createServer(app);

//into socketio

const { Server } = require('socket.io') ;
const io = new Server(server);

app.get('/', (req, res) =>{
   // res.send("hello from server");

   //instead let allow index.html handle:

   res.sendFile(__dirname + '/index.htm');
});

//socket io implementation
io.on('connection', (socket) =>{
    console.log('A user connected to the server');
    socket.broadcast.emit('hi');
    socket.on('chat msg', (msg) =>{
        io.emit('chat msg', msg);
        console.log('message: ' + msg);
    });
    socket.on('disconnect',() =>{
        
        console.log("user disconnected ...");


    });

})

server.listen(3000, () =>{
    console.log("listeningListener:: listening on 3000");
});
