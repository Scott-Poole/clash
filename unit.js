import {Entity} from './entity.js';

class Unit extends Entity{
	constructor(game,x,y,r,team,color){
		super(game,x,y,r,team,color);
		
		//override
		this.speed = 1.8 / 1000;//units per ms
		this.range = 10;//unit radius
		this.maxHealth = 100;
		this.health = this.maxHealth;
		this.damage = 10;//damage per attack
		this.nearestTarget = null;
		this.focusTarget = null;
		this.looking = 0;
		this.mass = 100;
		
		this.actionDelay = 1000;//ms before action
		this.actionClock = 0;
		this.hitDelay = 1000;//ms per attack
		this.hitClock = 0;
		
		//this.state = 'idle';
	}
	
	update(dt){
		
		this.actionClock += dt;
		
		if(this.health <= 0){
			//remove from game entities
			return;
		}
		
		if(this.actionClock > this.actionDelay){
			this.hitClock += dt;
			this.act();
		}
		
	}
	
	act(){
		if(this.focusTarget && this.focusTarget.health > 0 && this.distBetween(this.focusTarget) <= this.range){
			this.tryAttack();
			return;
		}
		this.focusTarget = null;
		this.searchNearest(dt);
	}
	
	tryAttack(){
		if(this.hitClock > this.hitDelay){
			this.hitClock = 0;
			this.focusTarget.health -= this.damage;
		}
	}
	
	searchNearest(dt){
		let dist = Math.MAX_VALUE;
		this.nearestTarget = null;
		for(let i = 0; i < game.entities.length; i++){
			if(this.game.entities[i].team != this.team){
				let d = this.distBetween(this.game.entities[i]);
				if(d < dist){
					dist = d;
					this.nearestTarget = this.game.entities[i];
				}
			}
		}
		
		if(dist <= this.range){
			this.focusTarget = this.nearestTarget;
			this.tryAttack();
			return;
		}
		
		this.tryMove(dt);
		
	}
	
	tryMove(dt){
		//move away from overlapping obstacles
		for(let j = 0; j < this.game.board.length; j++){
			for(let i = 0; i < this.game.board[0].length; i++){
				if(this.game.board[j][i] > 0 &&
				this.distSquared(i+0.5,j+0.5) < this.rS){
					this.move(this.x - i + 0.5, this.y - j + 0.5, dt);
					return;
				}
			}
		}
		//move away from overlapping entities
		
		//move toward nearest target
	}
	
	move(x,y,dt){
		let norm = 1 / Math.sqrt(x*x+y*y);
		this.x += x*norm*dt*this.speed;
		this.y += y*norm*dt*this.speed;
		
	}
	
}

export {Unit};