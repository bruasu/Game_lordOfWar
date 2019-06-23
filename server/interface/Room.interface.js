class Room{
    constructor(){
        this.id;
        this.username;
        this.nameRoom;
        this.countUserRoom;
        this.players = new Array;
        this.npc = new Array;
        this.status = "closed";
    }
}

module.exports = Room;