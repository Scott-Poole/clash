const Water = function(x,y,w,h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = '#0015FF';
	this.isStatic = true;
	this.update = function(){
		//its a water
	};
}

export {Water};