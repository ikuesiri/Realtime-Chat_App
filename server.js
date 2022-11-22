const express = require('express');

//App setup
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static('public'))

//Socket setup
const http = require('http'); 
const server = http.createServer(app);

//static files
const io = require('socket.io')(server);


//this is to enable the socket connection
io.on("connection",(socket) => {
    
    console.log(`made socket connection: ${socket.id}` )


    socket.on('chat', (data) =>{
        //remember socket signifies 1 user ,
        //we use 'io' therefore to emit the message to all uses
        io.sockets.emit('chat', data)

    })

    socket.on('typing', (data)  =>{
        socket.broadcast.emit('typing', data) //nb: this, will emit the message to all users except the sender 
    })
});


//server setup
server.listen(PORT, ()=> console.log(`server running at port ${PORT}`))