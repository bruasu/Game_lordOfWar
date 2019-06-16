const path = require("path");
const express = require("express");
const app = express();

//setings
app.set('port', process.env.PORT || 3000);

//static files
// app.use(express.static(path.join(__dirname,'public')));

// Start the server
const server = app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'));
});

const SocketIO = require('socket.io');
const io = SocketIO(server);

// websockets
io.on('connection',(socket) => {
    console.log('new conection', socket.id);

    socket.on('chat:message', (data)=>{
        io.sockets.emit('chat:server',data);
    });
    //envio los datos a todos menos a mi mismo
    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing',data);
    });
});
