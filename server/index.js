const express = require("express");
const morgan = require('morgan');

const app = express();
const appSocket = express();

const main = require("./game/main.js");

//setings
appSocket.set('port', process.env.PORT || 3030);
app.set('port', process.env.PORT || 3000);

//CORS
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Start the server
const serverSocket = appSocket.listen(appSocket.get('port'),()=>{
    console.log('server Socket on port', appSocket.get('port'));
});

app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'));
});

// websockets
const SocketIO = require('socket.io');
const io = SocketIO(serverSocket);
main.socket(io);

//routes

const LoginRouter = require("./routes/login.routes");
LoginRouter.start(app, main);