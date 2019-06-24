const socket = {
   start(){
    let socket = io('http://localhost:3000/roomsInfo');
    console.log(socket);

    data = {
        idSocket: socket.id
    }
   }

}