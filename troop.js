const Troop = function(x,y,color){
	this.x = x;
	this.y = y;
	this.color = color;
	this.update = function(){
		//move random
		this.x += Math.random() - Math.random();
		this.y += Math.random() - Math.random();
	};
}

export {Troop};