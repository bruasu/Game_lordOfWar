const socket = io('http://localhost:3030');

//DOM Elements
let username = document.getElementById('username');

/* var datos = {"username":username.value};

socket.emit('chat:message',datos); */

socket.on('chat:server', (data)=>{
    console.log(data);
});