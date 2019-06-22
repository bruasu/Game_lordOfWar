//http://gaurav.munjal.us/Universal-LPC-Spritesheet-Character-Generator/#
function readTextFile(file,callback){	
	var allText = null;
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function ()
	{
		if(rawFile.readyState === 4)
		{
			if(rawFile.status === 200 || rawFile.status == 0)
			{
				allText = rawFile.responseText;	
			}
		}
	}
	rawFile.send(null);
	callback(allText);
}
Math.getDistance = function( x1, y1, x2, y2 ) {
	
	var 	xs = x2 - x1,
		ys = y2 - y1;		
	
	xs *= xs;
	ys *= ys;
	 
	return Math.sqrt( xs + ys );
};
var data = {
	mapTxt : null,
	mapWidth : null,
	mapHeight : null,
	mapPointClicked:[null,null],
	regionSelected:[null,null,null,null],
	money : 500,
	img : new Image(),
	img_icon1 : new Image(),
	img_charrua_lancer : new Image(),
	img_charrua_archer : new Image(),
	img_charrua_archer2 : new Image(),
	img_guarani_lancer : new Image(),
	img_guarani_archer : new Image(),
	img_guarani_archer2 : new Image(),
	img_mapuche_lancer : new Image(),
	img_mapuche_archer : new Image(),
	img_mapuche_archer2: new Image(),
}
function collisionRectRect(rect1,rect2){
	if((rect1.x>rect2.x&&rect1.x<rect2.x+rect2.width)||(rect1.x+rect1.width>rect2.x&&rect1.x+rect1.width<rect2.x+rect2.width)||(rect1.x+rect1.width>rect2.x&&rect1.x+rect1.width<rect2.x+rect1.width)||(rect1.x>rect2.x&&rect1.x+rect1.width<rect2.x)){
		if((rect1.y>rect2.y&&rect1.y<rect2.y+rect2.height)||(rect1.y+rect1.height>rect2.y&&rect1.y+rect1.height<rect2.y+rect2.height)||(rect1.y+rect1.height>rect2.y&&rect1.y+rect1.height<rect2.y+rect1.height)||(rect1.y>rect2.y&&rect1.y+rect1.height<rect2.y)){
			return true;
		}
	}
	return false;
}
class Rect{
	constructor(x,y,width,height){
		this.x=x;
		this.y=y;
		this.width=width;
		this.height=height;
	}
}
class Map{
	constructor(screenWidth,screenHeight,player_username,player_id){
		this.player_username=player_username;
	    this.player_id=player_id;
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
		this.mapX = 0;
		this.mapY = 0;
		this.blockSize = Map.getBlockSize();
		this.allLoaded = false;
		this.const = new Construction(100,100,2,data.img,this.mapX,this.mapY);
		this.point = new ConstructionPoint(200,200,0,data.img_icon1,this.mapX,this.mapY);
		//this.chara = new Character(300,300,this.mapX,this.mapY,0,"charrua",0);
		console.log(gameDates)
		this.characters = [
		new Character(300,300,this.mapX,this.mapY,0,"charrua",0,this.player_username,this.player_id),
		new Character(350,300,this.mapX,this.mapY,0,"charrua",0,this.player_username,this.player_id),
		new Character(400,300,this.mapX,this.mapY,0,"charrua",0,this.player_username,this.player_id),
		new Character(450,300,this.mapX,this.mapY,0,"charrua",0,this.player_username,this.player_id),
		new Character(500,300,this.mapX,this.mapY,0,"charrua",0,this.player_username,this.player_id),
		new Character(550,300,this.mapX,this.mapY,0,"charrua",0,this.player_username,this.player_id)];
		this.angleCorrection = 1;
		readTextFile("../com.asubrothers.Maps/prototype1_2players.txt",function(txt){
		
			data.img.src="../../res/tilesheet1.png";
			data.img_icon1.src="../../res/icon1.png";
			data.img_charrua_lancer.src="../../res/characters/charrua/charrua_lancer.png";
			data.img_charrua_archer.src="../../res/characters/charrua/charrua_archer.png";
			data.img_charrua_archer2.src="../../res/characters/charrua/charrua_archer2.png";
			data.img_guarani_lancer.src="../../res/characters/guarani/guarani_lancer.png";
			data.img_guarani_archer.src="../../res/characters/guarani/guarani_archer.png";
			data.img_guarani_archer2.src="../../res/characters/guarani/guarani_archer2.png";
			data.img_mapuche_lancer.src="../../res/characters/mapuche/mapuche_lancer.png";
			data.img_mapuche_archer.src="../../res/characters/mapuche/mapuche_archer.png";
			data.img_mapuche_archer2.src="../../res/characters/mapuche/mapuche_archer2.png";
			data.mapTxt = txt;
		});		
		this.generate();
		this.allLoaded = true;
	}
	static getBlockSize() {return 32;}
	generate(){
		this.tiles = [];
		this.trees = [];
		//grass
		let blocksIds = data.mapTxt.split(";")[0].split(",");
		let lengthWidth=data.mapTxt.split(";")[0].split("\n")[0].split(",").length-1;
		let lengthHeight=data.mapTxt.split(";")[0].split("\n").length;
		data.mapWidth = lengthWidth*this.blockSize;
		data.mapHeight = lengthHeight*this.blockSize;
		for(let x = 0;x<lengthWidth;x++){
			this.tiles[x]=[];
			
		}
		let i = 0;
		
		for(let y = 0;y<lengthHeight;y++){
			for(let x = 0;x<lengthWidth;x++){			
				this.tiles[x][y] = new Block(x*this.blockSize,y*this.blockSize,parseInt(blocksIds[i]),data.img);
				i++;
			}
		}
		//vegetation
		//Trees
		//date 1: block x, date 2:block y, date 3:tipe of tree, date 4:x position correction
		let treesTxt = data.mapTxt.split(";")[1].split(",");
		i = 0;
		let x = null;
		let y = null;
		if(data.mapTxt.split(";")[1]!=""){// different null
			for(let index = 0;index<treesTxt.length;index++){
				let k = index+1;
				let currentValue = treesTxt[index];
				if(k==1+i*4){
					x = parseInt(currentValue);
					this.trees[i] = new Tree(null,null,null,data.img,this.mapX,this.mapY);
				}else if(k==2+i*4){
					y = parseInt(currentValue);
					this.trees[i].x=this.tiles[x][y].x;
					this.trees[i].y=this.tiles[x][y].y;
				}else if(k==3+i*4){
					this.trees[i].tipe=parseInt(currentValue);
				}else if(k==4+i*4){
					if(currentValue!="null"){
						this.trees[i].x+=parseInt(currentValue);
					}
					i++;
				}
			}
		}
	}
	addCharacter(x,y,civilization,tipe){

		this.characters.push(new Character(x,y,this.mapX,this.mapY,0,civilization,tipe,this.player_username,this.player_id));
		let i = this.characters.length-1;
		this.characters[i].moveTo(this.characters[i].x,this.characters[i].y+Character.getWidth()/2);
		this.angleCorrection = -1;
	}
	render(ctx){
		if(this.allLoaded){
			for(let x = 0;x<this.tiles.length;x++){
				for(let y = 0;y<this.tiles[0].length;y++){
					this.tiles[x][y].render(ctx,this.mapX,this.mapY);
					ctx.strokeStyle = "red";
					ctx.lineWidth = 0.5;
					//ctx.rect(this.tiles[x][y].x+this.mapX,this.tiles[x][y].y+this.mapY,32,32);	
				}
			}
			ctx.stroke();
			this.trees.forEach(function(value,index,arr){
				arr[index].render(ctx);
			});
			this.const.render(ctx);
			this.point.render(ctx);
			//this.chara.render(ctx);
			for(let i=0;i<this.characters.length;i++){
				this.characters[i].renderSelection(ctx);
			}
			for(let i=0;i<this.characters.length;i++){
				this.characters[i].render(ctx);
			}
			this.point.render2(ctx);
		}
		//draw mouse selection
		if(data.regionSelected[0]!=null){
			ctx.lineWidth=2;
			ctx.strokeStyle="#CD5C5C";
			ctx.rect(data.regionSelected[0]+this.mapX-2,data.regionSelected[1]+this.mapY-2,data.regionSelected[2]+4,data.regionSelected[3]+4);
			ctx.stroke();
			ctx.beginPath();
			ctx.lineWidth=2;
			ctx.strokeStyle="#F08080";
			ctx.rect(data.regionSelected[0]+this.mapX,data.regionSelected[1]+this.mapY,data.regionSelected[2],data.regionSelected[3]);
			ctx.stroke();
		}
		
	}
	moveMap(movx,movy){
		let speed = 3;
		if(this.mapX+movx*speed<=0){
			if(this.mapX+movx*speed>=-(data.mapWidth-this.screenWidth)){
				this.mapX+=movx*speed;
			}else{
				if(movx>0)
				this.mapX+=movx*speed;
			}
		}
		if(this.mapY+movy*speed<=0){
			if(this.mapY+movy*speed>=-(data.mapHeight-this.screenHeight)){
				this.mapY+=movy*speed;
			}else{
				if(movy>0)
				this.mapY+=movy*speed;
			}
		}
	}
	update(screenWidth,screenHeight){
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
		if(this.allLoaded){
			//mouse region
			if(gameDates.mouseClick){
				data.mapPointClicked=[gameDates.mouseX-this.mapX,gameDates.mouseY-this.mapY];
			}
			if(gameDates.mouseDrag){
				data.regionSelected=[data.mapPointClicked[0],data.mapPointClicked[1],gameDates.mouseX-this.mapX-data.mapPointClicked[0]-8,gameDates.mouseY-this.mapY-data.mapPointClicked[1]-8];
			}
			if(!gameDates.mousePressed){
				data.regionSelected=[null,null,null,null];
			}
			//map movement
			if(gameDates.mouseX<screenWidth*0.1){
				this.moveMap(1,0);
			}
			if(gameDates.mouseX>screenWidth-screenWidth*0.1){
				this.moveMap(-1,0);
			}
			if(gameDates.mouseY<screenHeight*0.1){
				this.moveMap(0,1);
			}
			if(gameDates.mouseY>screenHeight-screenHeight*0.1){
				this.moveMap(0,-1);
			}
			let mapX=this.mapX;
			let mapY=this.mapY;
			this.trees.forEach(function(value,index,arr){
				arr[index].update(mapX,mapY);
				
			});
			this.const.update(mapX,mapY);
			this.point.update(mapX,mapY);
			//mouse region and click select characters
			let clickedInSomeCharacter = false;
			for(let i=0;i<this.characters.length;i++){
				if(this.characters[i].player_username==gameDates.player_username&&this.characters[i].player_id==gameDates.player_id){
					if(gameDates.mouseClick){
						if(gameDates.mouseX-mapX>this.characters[i].x&&gameDates.mouseX-mapX<this.characters[i].x+this.characters[i].width){
							if(gameDates.mouseY-mapY>this.characters[i].y&&gameDates.mouseY-mapY<this.characters[i].y+this.characters[i].height){
								for(let j=0;j<this.characters.length;j++){
									this.characters[j].isSelected=false;
								}
								this.characters[i].isSelected=true;
								clickedInSomeCharacter=true;
							}
						}
					}
					if(data.regionSelected[0]!=null){
						if(collisionRectRect(new Rect(data.regionSelected[0],data.regionSelected[1],data.regionSelected[2],data.regionSelected[3]),new Rect(this.characters[i].x,this.characters[i].y,this.characters[i].width,this.characters[i].height))){
							this.characters[i].isSelected=true;
							clickedInSomeCharacter=true;
						}else{
							this.characters[i].isSelected=false;
						}
					}
				}
				
				this.characters[i].update(mapX,mapY);
			}
			if(!clickedInSomeCharacter&&gameDates.mouseClick){
				for(let i=0;i<this.characters.length;i++){
					if(this.characters[i].player_username==gameDates.player_username&&this.characters[i].player_id==gameDates.player_id){
						this.characters[i].isSelected=false;
					}
				}
			}
			//move selected character/s
			if(gameDates.mouseClickRight){
				let numberOfSelected = 0;
				let k = 0;
				for(let i=0;i<this.characters.length;i++){
					if(this.characters[i].player_username==gameDates.player_username&&this.characters[i].player_id==gameDates.player_id){
						if(this.characters[i].isSelected){	
							if(k==0)k=i;
							numberOfSelected++;
						}
					}
				}
				if(numberOfSelected==1){//if there is only one selected character
					if(this.characters[k].player_username==gameDates.player_username&&this.characters[k].player_id==gameDates.player_id){
						this.characters[k].moveTo(gameDates.mouseX-this.mapX-this.characters[k].width*0.6,gameDates.mouseY-this.mapY-this.characters[k].height*0.7);
					}
				}else if(numberOfSelected>1){//if there are many selected characters
					for(let i=0;i<this.characters.length;i++){
						if(this.characters[i].player_username==gameDates.player_username&&this.characters[i].player_id==gameDates.player_id&&
							this.characters[k].player_username==gameDates.player_username&&this.characters[k].player_id==gameDates.player_id){
							if(this.characters[i].isSelected){
								let deltaX = Math.getDistance(gameDates.mouseX-this.mapX-this.characters[k].width*0.6,0,-this.characters[k].x+this.mapX,0);
								let deltaY = Math.getDistance(0,gameDates.mouseY-this.mapY-this.characters[k].height*0.7,0,this.characters[k].y+this.mapY);
								let angle = Math.atan2(deltaY,deltaX);
								if(this.characters[i].direction==CharacterDirection.left||this.characters[k].direction==CharacterDirection.right){
									angle+=Math.PI/2;
								}
								let l=k==1?1:0;
								this.characters[i].moveTo(gameDates.mouseX-this.mapX-this.characters[k].width*0.6+(i-k+l)*Math.cos(angle)*(Character.getWidth()/2),
									gameDates.mouseY-this.mapY-this.characters[k].height*0.7+(i-k+l)*Math.sin(angle)*(Character.getWidth()/2));
							}
						}
						
					}
				}
			}
			//maintain separation between characters
			for(let i=0;i<this.characters.length;i++){
				if(this.characters[i].player_username==gameDates.player_username&&this.characters[i].player_id==gameDates.player_id){
					if(this.characters[i].state=="walking"){
						
						for(let j=0;j<this.characters.length;j++){
							if(this.characters[j].player_username==gameDates.player_username&&this.characters[j].player_id==gameDates.player_id){
								if(j!=i){
									if(this.characters[j].state=="still"){
										if(Math.getDistance(this.characters[i].x+this.characters[i].width/2,this.characters[i].y+this.characters[i].height/2,this.characters[j].x+this.characters[j].width/2,this.characters[j].y+this.characters[j].height/2)<Character.getWidth()*0.17){
											
											if(this.characters[i].remainigDistance<Character.getWidth()){
												
												let angle = -this.characters[i].angleDirection;
												let dis = Math.getDistance(this.characters[j].x,this.characters[j].y,this.characters[i].goTo[0],this.characters[i].goTo[1]);
												angle= this.characters[j].movingTime>10?angle+Math.random():angle;
												dis=dis==0?Character.getWidth():dis;
												angle=this.angleCorrection==1?angle:-angle;
												let x = Math.cos(angle)*dis;
												let y = Math.sin(angle)*dis;
												this.characters[j].moveTo(this.characters[j].x+x,this.characters[j].y+y);
												this.angleCorrection=1;
											}
										}
									}
								}	
							}				
						}
					}
				}
			}
		}
	}
}