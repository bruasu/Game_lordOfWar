
class ConstructionPoint{
    constructor(x,y,tipe,img,mapX,mapY){
        this.x=x;
        this.y=y;
        this.tipe=tipe;
        this.img=img;
        this.mapX=mapX;
        this.mapY=mapY;
    }
    render(ctx){
        ctx.drawImage(this.img,this.x+this.mapX,this.y+this.mapY,64,64);
    }
    update(mapX,mapY){
        this.mapX = mapX;
        this.mapY = mapY;
    }
}