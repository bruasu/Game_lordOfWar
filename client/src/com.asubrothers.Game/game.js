class Game{
	constructor(width,height,player_username,player_id){
		this.screenWidth = width;
		this.screenHeight = height;
		this.map = new Map(width,height,player_username,player_id);
		
	}
	render(ctx){
		//ctx.fillStyle  = "white";
		ctx.fillRect(0,0,this.screenWidth,this.screenHeight);
		ctx.fillStyle  = "green";
		this.map.render(ctx);
	}
	update(width,height){
		this.screenWidth = width;
		this.screenHeight = height;
		this.map.update(width,height);
		
	}
}