class Block{
	constructor(x,y,id,image){
		this.id = id;
		this.x=x;
		this.y=y;
		this.width=32;
		this.height=32;
		this.image = image;

	}
	render(ctx,mapX,mapY){
		let posx = this.id;
		let posy = Math.round((this.id)/((this.image.width/16)));
		for(let i = 1;i<this.image.height/16;i++){
			if(this.id>=(this.image.width/16)*i){
				posx=this.id-(this.image.width/16)*i;
			}
		}
		ctx.drawImage(this.image,(posx)*16+1,posy*16+1,16-2,16-2,this.x+mapX,this.y+mapY,this.width,this.height);
	}
	update(){
		
	}
}