const Room = require('../interface/Room.interface');

const roomsRouter = {
    start: (app, main) => {
        app.post('/api/rooms', (req, res) => {
            const username = req.body.name;
            const nameRoom = req.body.nameRoom;
            const maxUsersRoom = req.body.maxUsersRoom;
            const defaultNameRoom = 'room';
            const room = new Room();

            room.username = username;
            room.maxUsersRoom = maxUsersRoom;
            room.nameRoom = nameRoom != "" ? nameRoom: defaultNameRoom;

            main.rooms.push(room);

            res.json({
                msj: true
            });
        });
        app.get('/api/rooms', (req, res) => {
            res.json(main.rooms);
        });
        app.get('/api/rooms/delete/:name', (req, res) =>{
            let name = req.params.name;
            let response = main.deleteUser(name);
            
            if(response){
                res.json({
                    msj: true
                });
            }else{
                res.json({
                    msj: false
                });
            }
        });
    }
};

module.exports = roomsRouter;