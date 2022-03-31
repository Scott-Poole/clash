class Entity{
	constructor(game,x,y,team){
		this.game = game;
		this.x = x;
		this.y = y;
		this.team = team;
		
		this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
		this.r = 1;
		this.dead = false;
		this.state='idle';
		this.health=0;
		this.mass=99999;
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