var dimension = {
	width : window.innerWidht || document.documentElement.clientWidth || document.body.clientWidth,
	height : window.innerHeight|| document.documentElement.clientHeight || document.body.clientHeight,
	init:function(){
		window.addEventListener("resize",function(e){
			dimension.width=window.innerWidht || document.documentElement.clientWidth || document.body.clientWidth;
			dimension.height=window.innerHeight|| document.documentElement.clientHeight || document.body.clientHeight;
		});
	}
};