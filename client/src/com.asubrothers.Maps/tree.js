var imgCooTrees = [
[179,78,27,18],
[226,74,27,22],
[241,145,30,31]];
class Tree{
    constructor(x,y,tipe,img,mapX,mapY){
        this.x=x;
        this.y=y;
        this.tipe=tipe;
        this.img=img;
        this.mapX=mapX;
        this.mapY=mapY;
    }
    render(ctx){
        ctx.drawImage(this.img,
            imgCooTrees[this.tipe][0]
            ,imgCooTrees[this.tipe][1],imgCooTrees[this.tipe][2],imgCooTrees[this.tipe][3],this.x+this.mapX,this.y+this.mapY-Map.getBlockSize(),imgCooTrees[this.tipe][2]*2,imgCooTrees[this.tipe][3]*2);
    }
    update(mapX,mapY){
        this.mapX = mapX;
        this.mapY = mapY;
    }
}