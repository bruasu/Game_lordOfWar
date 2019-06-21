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
Math.getDistance = function( x1, y1, x2, y2 ) {
	
	var 	xs = x2 - x1,
		ys = y2 - y1;		
	
	xs *= xs;
	ys *= ys;
	 
	return Math.sqrt( xs + ys );
};
class Character{
    constructor(x,y,mapX,mapY,id,civilization,tipe){
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
        this.img.src = CharacterImgsPath[0];
        this.state = "still";
        this.isSelected = false;
        this.animationTime = 0;
        this.animationTile = 0;
        this.goTo = [null,null];
        this.speed = 2;
        this.direction = CharacterDirection.down;
    }
    render(ctx){
        
        if(this.state == "walking"){
            ctx.drawImage(this.img,
                this.animationTile*64,CharacterAnimations.walk[this.direction][0],64,64,
                this.x+this.mapX,this.y+this.mapY,this.width,this.height); 
        }else{//still
            ctx.drawImage(this.img,
                0,CharacterAnimations.walk[this.direction][0],64,64,
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
               this.moveTo(gameDates.mouseX-this.mapX-this.width*0.6,
                gameDates.mouseY-this.mapY-this.height*0.7);
            }
        }
        if(this.state == "walking"){    
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