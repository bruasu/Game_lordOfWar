const Room = require('../interface/Room.interface');

const roomsRouter = {
    start: (app, main) => {
        app.post('/api/rooms', (req, res) => {
            const username = req.body.name;
            const nameRoom = req.body.nameRoom;
            const countUserRoom = req.body.countUserRoom;
            const defaultNameRoom = 'room';
            const room = new Room();
            room.username = username;
            room.countUserRoom = countUserRoom;
            room.nameRoom = nameRoom != "" ? nameRoom: defaultNameRoom;

            main.rooms.push(room);

            console.log(main.rooms);
            res.json(main.rooms);
        });
    }
};

module.exports = roomsRouter;