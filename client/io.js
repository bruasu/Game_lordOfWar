const socket = io('http://localhost:3000');

//DOM Elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function(){
    var datos = {"username":username.value,"message":message.value};

    socket.emit('chat:message',datos);

});

socket.on('chat:server', (data)=>{
    console.log(data);
    output.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`;
});

message.addEventListener('keypress', function(){
    socket.emit('chat:typing', username.value);
});

socket.on('chat:typing', (data)=>{
    actions.innerHTML = '';
    actions.innerHTML = `<p><em>${data} is typing a message</em></p>`
});
