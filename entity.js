class Entity{
	constructor(game,x,y,r,team,color){
		this.game = game;
		this.x = x;
		this.y = y;
		this.r = r;
		this.rS = this.r*this.r;
		this.team = team;
		this.color = color;
	}
	
	update(dt){
		//default do nothing
	}
	
	distBetween(entity){
		return Math.sqrt((this.x - entity.x)**2 + (this.y - entity.y)**2) - this.r - entity.r;
	}
	
	distSquared(x,y){
		return (this.x - x)**2 + (this.y - y)**2;
	}
}

export {Entity};