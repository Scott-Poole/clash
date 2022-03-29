const width = 1;
const height = 1;
const Troop = function(x,y,color){
	this.x = x;
	this.y = y;
	this.w = width;
	this.h = height;
	this.color = color;
	this.isStatic = false;
	this.update = function(){
		//move random
		//this.x += Math.random() - Math.random();
		//this.y += Math.random() - Math.random();
	};
}

export {Troop};