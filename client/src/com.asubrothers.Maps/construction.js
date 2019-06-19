var imgCooConstructions = [
    [49,57,30,39],
    [49,99,30,29],
    [273,147,30,29],
];
    class Construction{
        constructor(x,y,tipe,img,mapX,mapY){
            this.x=x;
            this.y=y;
            this.tipe=tipe;
            this.img=img;
            this.mapX=mapX;
            this.mapY=mapY;
        }
        render(ctx){
            ctx.drawImage(this.img,imgCooConstructions[this.tipe][0],imgCooConstructions[this.tipe][1],imgCooConstructions[this.tipe][2],imgCooConstructions[this.tipe][3],this.x+this.mapX,this.y+this.mapY-Map.getBlockSize(),imgCooConstructions[this.tipe][2]*2,imgCooConstructions[this.tipe][3]*2);
        }
        update(mapX,mapY){
            this.mapX = mapX;
            this.mapY = mapY;
        }
    }