const main = {
    users: new Array,
    start: () =>{

    },
    socket: (io) => {
        io.on('connection',(socket) => {
            console.log('new conection', socket.id);
    
            socket.on('chat:loginUser', (data)=>{
                io.sockets.emit('chat:server',data);
                // socket.broadcast.emit('chat:server',data); // send all but not this
                console.log(data);
            });
            //envio los datos a todos menos a mi mismo
        /*     socket.on('chat:typing', (data)=>{
                socket.broadcast.emit('chat:typing',data);
            }); */
        });
    },
    checkUser: (name) => {

        if(main.users.length > 0){
            for(let i = 0; i < main.users.length; i++){
                if(name == main.users[i]){
                    return false;
                }else{
                    return true;
                }
            }
        }else{
            return true;
        }
    }

};

module.exports = main;