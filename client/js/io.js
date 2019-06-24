const socket = io('http://localhost:3030');


//socket.emit('chat:message',datos); 

socket.on('chat:server', (data)=>{
    console.log(data);
});
socket.on('listRooms:server', (data) =>{
    console.log(data);
});
socket.on('roomsEventupdate', (data)=>{
    console.log('rooms', data);
    
})