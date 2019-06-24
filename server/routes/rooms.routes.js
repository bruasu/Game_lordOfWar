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
    }
};

module.exports = roomsRouter;