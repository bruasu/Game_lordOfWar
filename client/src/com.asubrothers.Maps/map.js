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
var data = {
	mapTxt : null,
	mapWidth : null,
	mapHeight : null,
	img : new Image()
}
class Map{
	constructor(screenWidth,screenHeight){
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
		this.mapX = 0;
		this.mapY = 0;
		this.blockSize = Map.getBlockSize();
		this.allLoaded = false;
		readTextFile("../com.asubrothers.Maps/prototype1_2players.txt",function(txt){
			data.img.src="../../res/tilesheet1.png";
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
		//console.log(this.trees);
		//this.moveMap(-230,-400);
	}
	render(ctx){
		if(this.allLoaded){
			//console.log(this.tiles[0].length);
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
		}
	}
	moveMap(movx,movy){
		let speed = 3;
		if(this.mapX+movx*speed<=0){
			if(this.mapX+movx*speed>=-(data.mapWidth-this.screenWidth)){
				this.mapX+=movx*speed;
			}
		}
		if(this.mapY+movy*speed<=0){
			if(this.mapY+movy*speed>=-(data.mapHeight-this.screenHeight)){
				this.mapY+=movy*speed;
			}
		}
	}
	update(screenWidth,screenHeight){
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
		if(this.allLoaded){
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
		}
	}
	
}