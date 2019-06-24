const loginRouter = {
    start: (app, main) => {
        app.get('/api/login/:name', (req, res) =>{
            const name = req.params.name;

            const responseCheck = main.checkUser(name);
            console.log(responseCheck);
            if(responseCheck){
                main.users.push(name);
                res.json({
                    "authentication": "true",
                    "name": name
                });
            }else{
                res.json({
                    "authentication": "false"
                });
            }
            console.log(main.users);
        });
    }
    
}

module.exports = loginRouter; 