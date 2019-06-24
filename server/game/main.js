const main = {
    users: new Array(),
    rooms: new Array(),
    socketUsers: {},
    start: () =>{

    },
    socket: (io) => {
        const roomsInformation = io
            .of('roomsInfo')
            .on('connection', (socket) => {
                console.log('new user connect: '+ socket.id);

                socket.on('disconnect', function(){
                    console.log('disconnect user id: '+ socket.id);
                    
                });
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
    },
    deleteUser(name){
        if(name){
            for (let i = 0; i < main.users.length; i++) {
                if(name == main.users[i]){
                    main.users.splice(i,1);
                    return true;
                }             
            }
            return false;
        }
    }

};

module.exports = main;