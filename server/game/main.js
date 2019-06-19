const main = {
    users: new Array,
    start: () =>{

    },
    socket: (io) => {
        io.on('connection',(socket) => {
            console.log('new conection', socket.id);
    
            socket.on('chat:message', (data)=>{
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
        let result = false;

        if(main.users.length > 0){
            for(let i = 0; i < main.users.length; i++){
                if(name == main.users[i]){
                    result = false;
                    break;
                }else{
                    result = true;
                }
            }
            return result;
        }else{            
            return true;
        }
    }

};

module.exports = main;