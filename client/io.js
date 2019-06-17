const socket = io('http://localhost:3030');

//DOM Elements
let name = document.getElementById('name');
let btn = document.getElementById('send');

btn.addEventListener('click', function(){
    var datos = {"name": name.value};

    socket.emit('chat:loginUser',datos);

});

socket.on('chat:server', (data)=>{
    console.log(data);    
});

/* socket.on('chat:typing', (data)=>{

});
 */
