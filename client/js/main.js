const main = {
    pathUrl: 'http://localhost:3000',
    start: () => {
        main.login();
    },
    login: () => {
        send.addEventListener('click', function(){
          main.ayax(main.pathUrl+'/api/login/' + username.value,(res) => {
            
            if(res.authentication == 'true'){

              
            }else{
              
              alertUserExists.classList.remove("hidden")
              let html = "<h4>Usuario en Uso </h4><h5>Intente con otro nombre de Usuario</h5>";  
              alertUserExists.innerHTML = html;
            }
          },'GET');
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
    }
}

main.start();