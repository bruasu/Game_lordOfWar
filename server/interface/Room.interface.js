class Room{
    constructor(){
        this.id;
        this.username; //username of the creator Room
        this.nameRoom;
        this.maxUsersRoom;
        this.quantityUserRoom;
        this.players = new Array;
        this.npc = new Array;
        this.status = "closed";

        this.calculateNumberUser();
    }
    calculateNumberUser(){
        if(this.players.length > 0){
            this.quantityUserRoom = this.players.length;
        }else{
            this.quantityUserRoom = 0;
        }
    }

}

module.exports = Room;