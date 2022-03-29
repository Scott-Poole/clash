const Barrier = function(x,y,w,h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = '#FF4500';
	this.isStatic = true;
	this.update = function(){
		//its a wall
	};
}

export {Barrier};