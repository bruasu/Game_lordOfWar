const loginRouter = {
    start: (app, main) => {
        app.get('/api/login', (req, res) =>{
            const name = req.body.name;

            const responseCheck = main.checkUser(name);

            
            if(responseCheck){
                main.users.push(name);
                res.json({
                    "authentication": "true"
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