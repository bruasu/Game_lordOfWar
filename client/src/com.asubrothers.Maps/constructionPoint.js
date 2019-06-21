Constructions = {
   charrua_center : new Construction(null,null,null,null,null,null,"charrua center"),
   guarani_center : new Construction(null,null,null,null,null,null,"guarani center")
}
Actions = {
    add_soldier : new Action("Lancero $50"),
    add_soldier2 : new Action("Arquero $50")
}
class ConstructionPoint{
    constructor(x,y,tipe,img,mapX,mapY){
        this.x=x;
        this.y=y;
        this.width=64;
        this.height=64;
        this.tipe=tipe;
        this.img=img;
        this.mapX=mapX;
        this.mapY=mapY;
        this.isOpen=false;
        this.items = [Constructions.charrua_center,Constructions.guarani_center];
        this.actionItems = [Actions.add_soldier,Actions.add_soldier2];
        this.animationRadius = 0.1;
        this.construction = null;
    }
    render(ctx){
        let x = this.x+this.mapX;
        let y = this.y+this.mapY;
        //draw central icon
        if(!this.construction){
            ctx.drawImage(this.img,x,y,64,64);
        }
        //draw construction
        if(this.construction){
            this.construction.render(ctx);
        }
    }
    render2(ctx){
        //draw items
        if(this.isOpen){
            if(this.construction){
                let ACTIONITEMS = this.getItemsDimensions(this.actionItems);
                for(let i=0;i<ACTIONITEMS.length;i++){
                    ctx.beginPath();
                    var grd = ctx.createRadialGradient(ACTIONITEMS[i][0],ACTIONITEMS[i][1],ACTIONITEMS[i][2]/5,ACTIONITEMS[i][0],ACTIONITEMS[i][1],ACTIONITEMS[i][2]);
                    grd.addColorStop(0, "gray");
                    grd.addColorStop(1, "white");
                    ctx.fillStyle = grd;
                    ctx.arc(ACTIONITEMS[i][0],ACTIONITEMS[i][1],ACTIONITEMS[i][2]*this.animationRadius,0,Math.PI*2);
                    ctx.fill();
                    //draw item name
                    if(this.pointCircle(gameDates.mouseX,gameDates.mouseY,ACTIONITEMS[i][0],ACTIONITEMS[i][1],ACTIONITEMS[i][2])){
                        ctx.fillStyle = "black";
                        ctx.fillRect(ACTIONITEMS[i][0]-this.actionItems[i].name.length*2-3,ACTIONITEMS[i][1]-this.width*0.55-10,this.actionItems[i].name.length*5.55,13);
                        ctx.fillStyle = "white";
                        ctx.fillText(this.actionItems[i].name,ACTIONITEMS[i][0]-this.actionItems[i].name.length*2,ACTIONITEMS[i][1]-this.width*0.55);
                    }
                    //draw icon
                    let imgCooActionItemIndex = 0;
                    let img = null;
                    if(this.actionItems[i].name==Actions.add_soldier.name){
                        imgCooActionItemIndex = 0;
                        img=data.img_charrua_lancer;
                    }
                    if(this.actionItems[i].name==Actions.add_soldier2.name){
                        imgCooActionItemIndex = 1;
                        img=data.img_charrua_archer2;
                    }
                    let iconX = ACTIONITEMS[i][0]-ACTIONITEMS[i][2]*0.75;
                    let iconY = ACTIONITEMS[i][1]-ACTIONITEMS[i][2]*0.9;
                    let iconWidth = ACTIONITEMS[i][2]*1.5;
                    let iconHeight = ACTIONITEMS[i][2]*1.5;
                    ctx.drawImage(img,imgCooActionItems[imgCooActionItemIndex][0],imgCooActionItems[imgCooActionItemIndex][1],imgCooActionItems[imgCooActionItemIndex][2],imgCooActionItems[imgCooActionItemIndex][3],iconX+(iconWidth/2)*(1-this.animationRadius),iconY+(iconHeight/2)*(1-this.animationRadius),iconWidth*this.animationRadius,iconHeight*this.animationRadius);
                }
            }else{
                let ITEMS = this.getItemsDimensions(this.items);
                for(let i=0;i<ITEMS.length;i++){
                    ctx.beginPath();
                    var grd = ctx.createRadialGradient(ITEMS[i][0],ITEMS[i][1],ITEMS[i][2]/5,ITEMS[i][0],ITEMS[i][1],ITEMS[i][2]);
                    grd.addColorStop(0, "gray");
                    grd.addColorStop(1, "white");
                    ctx.fillStyle = grd;
                    ctx.arc(ITEMS[i][0],ITEMS[i][1],ITEMS[i][2]*this.animationRadius,0,Math.PI*2);
                    ctx.fill();
                    //draw item name
                    if(this.pointCircle(gameDates.mouseX,gameDates.mouseY,ITEMS[i][0],ITEMS[i][1],ITEMS[i][2])){
                        ctx.fillStyle = "black";
                        ctx.fillRect(ITEMS[i][0]-this.items[i].name.length*2-3,ITEMS[i][1]-this.width*0.55-10,this.items[i].name.length*5,13);
                        ctx.fillStyle = "white";
                        ctx.fillText(this.items[i].name,ITEMS[i][0]-this.items[i].name.length*2,ITEMS[i][1]-this.width*0.55);
                    }
                    //draw icon
                    let imgCooConstructionsIndex = 0;
                    if(this.items[i].name==Constructions.charrua_center.name){
                        imgCooConstructionsIndex = 0; 
                    }
                    if(this.items[i].name==Constructions.guarani_center.name){
                        imgCooConstructionsIndex = 1;
                    }
                    let iconX = ITEMS[i][0]-ITEMS[i][2]*0.65;
                    let iconY = ITEMS[i][1]-ITEMS[i][2]*0.70;
                    let iconWidth = ITEMS[i][2]*1.3;
                    let iconHeight = ITEMS[i][2]*1.3;
                    ctx.drawImage(data.img,imgCooConstructions[imgCooConstructionsIndex][0],imgCooConstructions[imgCooConstructionsIndex][1],imgCooConstructions[imgCooConstructionsIndex][2],imgCooConstructions[imgCooConstructionsIndex][3],iconX+(iconWidth/2)*(1-this.animationRadius),iconY+(iconHeight/2)*(1-this.animationRadius),iconWidth*this.animationRadius,iconHeight*this.animationRadius);
                }
            }
            
        }
    }
    getItemsDimensions(collection){// devuelve un array con centro x,centro y,radio
        let itemsCollection = [];
        let x = this.x+this.mapX;
        let y = this.y+this.mapY;
        let items = collection.length;
        let radius = this.width*1.1;
        let diameterItems = this.width*0.9;
        for(let i=0;i<items;i++){
            let x2 = x + radius * Math.cos(2 * Math.PI * i / items) +this.width*0.45-diameterItems/2;
            let y2 = y + radius * Math.sin(2 * Math.PI * i / items)+this.height/2-diameterItems/2; 
            itemsCollection.push([x2+diameterItems/2,y2+diameterItems/2,diameterItems/2]);
        }
        return itemsCollection;
    }
    pointCircle(px,  py,  cx,  cy,  r) {
        let distX = px - cx;
        let distY = py - cy;
        let distance = Math.sqrt( (distX*distX) + (distY*distY) );
        if (distance <= r) {
          return true;
        }
        return false;
      }
    update(mapX,mapY){
        this.mapX = mapX;
        this.mapY = mapY;
        //Abre para ver las opciones de construccion
        if(gameDates.mouseState=="down"){
            let verify = true;
            if(this.construction){
                let ACTIONITEMS = this.getItemsDimensions(this.actionItems);
                for(let i=0;i<ACTIONITEMS.length;i++){
                    if(this.pointCircle(gameDates.mouseX,gameDates.mouseY,ACTIONITEMS[i][0],ACTIONITEMS[i][1],ACTIONITEMS[i][2])){
                        verify=false;      
                    }
                }
            }else{
                let ITEMS = this.getItemsDimensions(this.items);
                for(let i=0;i<ITEMS.length;i++){
                    if(this.pointCircle(gameDates.mouseX,gameDates.mouseY,ITEMS[i][0],ITEMS[i][1],ITEMS[i][2])){
                        verify=false;      
                    }
                }
            }
            this.isOpen = (this.items.length>0) ? (verify ? ((this.pointCircle(gameDates.mouseX,gameDates.mouseY,this.x+this.width/2+this.mapX,this.y+this.height*0.6+this.mapY,this.width/2))? true:false):this.isOpen):false;
            if(!this.isOpen){
                this.animationRadius=0.1;
            }
            
        }
        if(this.isOpen){
            if(this.construction){

            }else{
                let ITEMS = this.getItemsDimensions(this.items);
                for(let i=0;i<ITEMS.length;i++){
                    if(gameDates.mouseState=="down"){
                        if(this.pointCircle(gameDates.mouseX,gameDates.mouseY,ITEMS[i][0],ITEMS[i][1],ITEMS[i][2])){
                            //detecta cuando toca en un item
                            if(data.money>this.items[i].price){
                                this.items[i]=new Construction(this.x,this.y+10,i,data.img,this.mapX,this.mapY,this.items[i].name);
                                this.construction = this.items[i];
                                this.isOpen = false;
                            }
                        }
                    }
                }
            }
            if(this.animationRadius <1){
                this.animationRadius+=0.04;
            }
        }
        //...
        if(this.construction){
            this.construction.update(this.mapX,this.mapY);
        }
    }
}