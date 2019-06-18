var keyboard = {
	keys: new Array(),
	init: function(){
		document.onkeydown = keyboard.saveKey;
	},
	saveKey: function(e){
		keyboard.keys.push(e.key);
		//console.log(e.key);
	},
	pulsedKey: function(keyCode){
		return (keyboard.keys.indexOf(keyCode) !== -1) ? true:false;
	},
	restart: function(){
		keyboard.keys = new Array();
	}
}