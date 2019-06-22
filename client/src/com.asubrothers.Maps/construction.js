var imgCooConstructions = [
    [49,57,30,39],
    [49,99,30,29],
    [273,147,30,29],
];
    class Construction{
        constructor(x,y,tipe,img,mapX,mapY,name,civilization){
            this.x=x;
            this.y=y;
            this.tipe=tipe;
            this.img=img;
            this.mapX=mapX;
            this.mapY=mapY;
            this.price=100;
            this.name=name;
            this.civilization=civilization;
        }
        
        render(ctx){
            let correction=5;
            correction = this.civilization=="guarani" ? 25:correction;
            correction = this.civilization=="mapuche" ? 30:correction;
            ctx.drawImage(this.img,imgCooConstructions[this.tipe][0],imgCooConstructions[this.tipe][1],imgCooConstructions[this.tipe][2],imgCooConstructions[this.tipe][3],this.x+this.mapX+2,this.y+this.mapY-Map.getBlockSize()+correction,imgCooConstructions[this.tipe][2]*2,imgCooConstructions[this.tipe][3]*2);
        }
        update(mapX,mapY){
            this.mapX = mapX;
            this.mapY = mapY;
        }
    }