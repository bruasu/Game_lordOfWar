document.addEventListener("DOMContentLoaded",function(){
	dimension.init();
	keyboard.init();
	runnable.run();
	
},false);

var gameDates = {
	game : new Game(dimension.width,dimension.height),
	canvas : document.getElementById("canvas"),
	mouseX: dimension.width/2,
	mouseY: dimension.height/2
}
document.addEventListener("mousemove",function(e){
	gameDates.mouseX=e.pageX;
	gameDates.mouseY=e.pageY;
});
var runnable = {
	thread: null,
	lastRegister: 0,
	aps: 0,
	fps: 0,
	run: function(temporalRegister){
		runnable.thread = window.requestAnimationFrame(runnable.run);
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
		runnable.aps++;
		canvas.width = dimension.width;
		canvas.height = dimension.height;
		gameDates.game.update(dimension.width,dimension.height);
		keyboard.restart();
		
	},
	render: function(temporalRegister){
		runnable.fps++;
		let ctx = canvas.getContext("2d");
		gameDates.game.render(ctx);
	}
};