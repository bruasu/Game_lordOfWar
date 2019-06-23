CharacterImgsPath = [
    "../../res/characters/charrua/charrua_lancer.png",
    "../../res/characters/charrua/charrua_archer.png",
    "../../res/characters/charrua/charrua_archer2.png",
    "../../res/characters/guarani/guarani_lancer.png",
    "../../res/characters/guarani/guarani_archer.png",
    "../../res/characters/guarani/guarani_archer2.png",
    "../../res/characters/mapuche/mapuche_lancer.png",
    "../../res/characters/mapuche/mapuche_archer.png",
    "../../res/characters/mapuche/mapuche_archer2.png",
];
CharacterAnimations = {
    spellcast: [],
    thrust: [],
    walk: [[64*8],[64*9],[64*10],[64*11]],
    slash: [],
    shoot: [[64*16],[64*17],[64*18],[64*19]],
    hurt: []
}
CharacterDirection = {
    up : 0,
    left : 1,
    down : 2,
    right : 3
}

class Character{
    constructor(x,y,mapX,mapY,id,civilization,tipe,player_username,player_id){
        this.player_username=player_username;
	    this.player_id=player_id;
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;
        this.mapX = mapX;
        this.mapY = mapY;
        this.id=id;
        this.civilization=civilization;
        this.tipe=tipe;
        this.img = new Image();
        let i = 1;
        if(civilization=="charrua")i=0;
        if(civilization=="guarani")i=3;
        if(civilization=="mapuche")i=6;
        this.img.src = CharacterImgsPath[tipe+i];
        this.state = "still";
        this.isSelected = false;
        this.animationTime = 0;
        this.animationTile = 0;
        this.goTo = [null,null];
        this.speed = 2;
        this.direction = CharacterDirection.down;
        this.remainigDistance = 0;
        this.angleDirection = 0;
        this.movingTime=0;
    }
    static getWidth(){
        return 64;
    }
    renderSelection(ctx){
        if(this.isSelected){
            ctx.beginPath();
            ctx.strokeStyle="yellow";
            ctx.lineWidth=(2);
            ctx.arc(this.x+this.mapX+this.width/2,this.y+this.mapY+this.height*0.9,this.width/3,0,Math.PI*2);
            ctx.stroke();
        }
    }
    render(ctx){
        
        ctx.beginPath();
        if(this.state == "walking"){
            ctx.drawImage(this.img,
                this.animationTile*64,CharacterAnimations.walk[this.direction][0],64,64,
                this.x+this.mapX,this.y+this.mapY,this.width,this.height); 
        }else{//still
            ctx.drawImage(this.img,
                this.tipe,
                CharacterAnimations.walk[this.direction]
                [0] ,
                64,64,
                this.x+this.mapX,this.y+this.mapY,this.width,this.height);
        }
    }
    moveTo(x,y){
        this.state = "walking";
        this.goTo = [x,y];                
    }
    update(mapX,mapY){
        this.mapX = mapX;
        this.mapY = mapY;
        if(this.isSelected){
            if(gameDates.mouseClickRight){
               //this.moveTo(gameDates.mouseX-this.mapX-this.width*0.6,
                //gameDates.mouseY-this.mapY-this.height*0.7);
            }
        }
        if(this.state == "walking"){  
            
              
            this.movingTime++;
            if(this.movingTime>100)this.movingTime=0;
            this.animationTime++;
            if(this.animationTime>=10){
                this.animationTime=0;
                this.animationTile++;
            }
            if(this.animationTile>8){
                this.animationTile=0;
            }
            let deltaX = Math.getDistance(this.goTo[0],0,this.x,0);
            let deltaY = Math.getDistance(0,this.goTo[1],0,this.y);
            let angle = Math.atan2(deltaY,deltaX);
            this.angleDirection=angle;
            if(this.x>this.goTo[0]){
                this.x -= Math.cos(angle)*this.speed;
                if(deltaX>2||deltaY>2){if(deltaX>deltaY){this.direction=CharacterDirection.left;}}
            }
            if(this.x<this.goTo[0]){
                this.x += Math.cos(angle)*this.speed;
                if(deltaX>2||deltaY>2){if(deltaX>deltaY){this.direction=CharacterDirection.right;}}
            }
            if(this.y>this.goTo[1]){
                this.y -= Math.sin(angle)*this.speed;
                if(deltaX>2||deltaY>2){if(deltaY>deltaX){this.direction=CharacterDirection.up;}}
            }
            if(this.y<this.goTo[1]){
                this.y += Math.sin(angle)*this.speed;
                if(deltaX>2||deltaY>2){if(deltaY>deltaX){this.direction=CharacterDirection.down;}}
            }
            let distance = Math.getDistance(this.x,this.y,this.goTo[0],this.goTo[1]);
            distance = distance<2?0:distance;
            this.remainigDistance=distance;
            if(parseInt(deltaX)<=1){
                if(parseInt(deltaY)<=1){
                    this.animationTime=0;
                    this.animationTile=0;
                    this.state="still";
                    
                }
            }

        }
    }
}