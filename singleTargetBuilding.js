import {Entity} from './entity.js';

class SingleTargetBuilding extends Entity{
	constructor(game,x,y,team){
		super(game,x,y,team);
		
		//SingleTargetBuilding
		this.range = 6.0;//unit radius
		this.maxHealth = 20;
		this.damage = 10;//damage per attack
		this.focusTarget = null;
		this.looking = 0;
		
		this.spawnDelay = 1000; //ms before first action
		this.duringAttackDelay = 200;//ms during attack
		this.betweenAttackDelay = 1000;//ms between strikes
		
		this.clock = 0;
		this.actionClock = this.spawnDelay;//ms time before next action
		this.duringAttackClock = 0;//ms time before attack deals damage
		this.betweenAttackClock = 0;//ms time when can attack
		
		
		//override Enitity
		//this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
		//this.r = 1;
		//this.dead = false;
		//this.state = 'idle';
		this.health = this.maxHealth;
		//this.mass=99999;
		
	}
	
	update(dt){
		
		this.clock += dt;
		
		if(this.dead && this.state != 'attacking'){
			this.state = 'remove';
		}
		
		if(this.state == 'remove'){
			return;
		}
		
		if(this.health <= 0){
			this.dead = true;
		}
		
		if(this.clock > this.actionClock){
			this.act(dt);
			return;
		}
		
		this.state = 'idle';
		
	}
	
	act(dt){
		if(this.focusTarget && !this.focusTarget.dead && this.distBetween(this.focusTarget) <= this.range){
			this.tryAttack();
			return;
		}
		
		//search for target
		this.focusTarget = null;
		let dist = 99999;
		let nearestTarget = null;
		for(let i = 0; i < this.game.entities.length; i++){
			if(this.game.entities[i].team != this.team && !this.game.entities[i].dead){
				let d = this.distBetween(this.game.entities[i]);
				if(d < dist){
					dist = d;
					nearestTarget = this.game.entities[i];
				}
			}
		}
		
		if(dist <= this.range){
			this.focusTarget = nearestTarget;
			this.tryAttack();
			return;
		}
		
		this.state = 'idle';
	}
	
	tryAttack(){
		//start attack
		if(this.state != 'attacking' && this.clock > this.betweenAttackClock){
			this.state = 'attacking';
			this.duringAttackClock = this.clock + this.duringAttackDelay;
		}
		//attack done
		if(this.state == 'attacking' && this.clock > this.duringAttackClock){
			this.state = 'idle';
			this.betweenAttackClock = this.clock + this.betweenAttackDelay;
			this.focusTarget.health -= this.damage;
		}
		
	}
	
}

export {SingleTargetBuilding};