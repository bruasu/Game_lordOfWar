document.addEventListener("DOMContentLoaded",function(){
	dimension.init();
	keyboard.init();
	runnable.run();
	
},false);

var gameDates = {
	player_username:"player",
	player_id:0,
	game : new Game(dimension.width,dimension.height,"player",0),
	canvas : document.getElementById("canvas"),
	mouseX: dimension.width/2,
	mouseY: dimension.height/2,
	mouseState: "up",
	mouseDrag:false,
	mouseMoving:false,
	mousePressed:false,
	mouseClick:false,
	mouseClickRight:false
}

document.addEventListener("mousemove",function(e){

	gameDates.mouseMoving=true;
	gameDates.mouseX=e.pageX;
	gameDates.mouseY=e.pageY;
	
});

document.addEventListener("click",function(e){
	gameDates.mouseState = "down";
});
document.addEventListener("mousedown",function(e){
	if(e.button==0){
		gameDates.mousePressed=true;
		gameDates.mouseClick=true;
	}
	if(e.button==2){
		gameDates.mouseClickRight=true;
	}
});
document.addEventListener("mouseup",function(e){
	gameDates.mouseDrag = false;
	gameDates.mousePressed=false;
	
});
var runnable = {
	thread: null,
	lastRegister: 0,
	aps: 0,
	fps: 0,
	run: function(temporalRegister){
		runnable.thread = window.requestAnimationFrame(runnable.run);
		gameDates.player_username="player";
		gameDates.player_id=0;
		runnable.update(temporalRegister);
		runnable.render(temporalRegister);
		if(temporalRegister - runnable.lastRegister > 999){
			runnable.lastRegister = temporalRegister;
			//console.log("APS:"+runnable.aps+" | FPS:"+runnable.fps);
			runnable.aps = 0;
			runnable.fps = 0;
		}
	},
	stop: function(){

	},
	update: function(temporalRegister){
		if(gameDates.mouseMoving&&gameDates.mousePressed){
			gameDates.mouseDrag = true;
			
		}
		runnable.aps++;
		canvas.width = dimension.width;
		canvas.height = dimension.height;
		gameDates.game.update(dimension.width,dimension.height);
		if(gameDates.mouseState=="down"){
			gameDates.mouseState="up";
		}
		keyboard.restart();
		gameDates.mouseMoving=false;
		gameDates.mouseClick=false;
		gameDates.mouseClickRight=false;
	},
	render: function(temporalRegister){
		runnable.fps++;
		let ctx = canvas.getContext("2d");
		gameDates.game.render(ctx);
	}
};