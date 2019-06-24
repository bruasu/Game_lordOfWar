const main = {
    pathUrl: 'http://192.168.1.44:3000',
    name: null,
    start: () => {
        main.login();
    },
    login: () => {
        send.addEventListener('click', function(){
          main.ayax(main.pathUrl+'/api/login/' + username.value,(res) => {
            
            if(res.authentication == 'true'){
              // window.location = 'src/com.asubrothers.Game/index.html';
              main.name = username.value; 
              Rooms.classList.remove('d-none');   
              login.classList.add('d-none');  
              nameUserTableCreationRoom.innerText = main.name;  
            }else{
              
              alertUserExists.classList.remove("hidden")
              let html = "<h4>Usuario en Uso </h4><h5>Intente con otro nombre de Usuario</h5>";  
              alertUserExists.innerHTML = html;
            }
          },'GET');
        });

        newRoom.addEventListener('click', () => {
          main.ayax(main.pathUrl+'/api/rooms', (res) => {

            main.updateRooms();            

          }, 'POST', JSON.stringify({
            "name": main.name,
            "nameRoom": nameRoom.value,
            'maxUsersRoom': maxUsersRoom.value
          }));
        });

      username.addEventListener('click', () => {
        username.value = '';
        alertUserExists.classList.add('hidden');
      });
    },
    ayax: (path, fun ,method = "GET", date = null) => {

        var xhttp = new XMLHttpRequest();
        //xhttp.withCredentials = true;
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            fun(JSON.parse(this.responseText));
          }
        };
        xhttp.open(method, path, true);
        xhttp.setRequestHeader("content-type", "application/json");
        xhttp.send(date);
    },
    updateRooms(){
      main.ayax(main.pathUrl+'/api/rooms', (res) => {
        let html = "<tr><th>Room</th><th>count</th><th>status</th><th></th></tr>";
        console.log(res);
            for(var i = 0; i < res.length; i++){
              let quantityUser = res[i].quantityUserRoom+"/"+res[i].maxUsersRoom;
              let tr = "<tr><td>"+res[i].nameRoom+"</td><td>"+quantityUser+"</td><td>"+res[i].status+"</td><td class='btn btn-primary btn-sm'>Play</td></tr>";
              html += tr;
            }
        roomsList.innerHTML = html;
      }, 'GET');
    }
}

main.start();