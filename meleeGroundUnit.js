import {Entity} from './entity.js';
import {astar,Graph} from './astar.js';

class MeleeGroundUnit extends Entity{
	constructor(game,x,y,team){
		super(game,x,y,team);
		
		//override
		this.speed = 1.8 / 1000;//units per ms
		this.range = 0.5;//unit radius
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
		
		//override Entity
		//this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
		this.r = 0.5;
		//this.dead = false;
		//this.state='idle';
		this.health = this.maxHealth;
		this.mass = 100;
	}
	
	update(dt){
		
		this.clock += dt;
		if(this.dead){
			this.state = 'remove';
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
		this.focusTarget = null;
		this.tryMove(dt);
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
	
	tryMove(dt){
		//move away from overlapping obstacles
		for(let j = 0; j < this.game.board.length; j++){
			for(let i = 0; i < this.game.board[0].length; i++){
				if(this.game.board[j][i] != 1 &&
				this.distSquared(i+0.5,j+0.5) < (this.r)**2){
					this.move(this.x - i + 0.5, this.y - j + 0.5, dt);
					this.state = 'moving';
					return;
				}
			}
		}
		//move away from overlapping entities
		for(let i = 0; i < this.game.entities.length; i++){
			if(this != this.game.entities[i] && this.distBetween(this.game.entities[i]) < 0 && this.mass <= this.game.entities[i].mass){
				this.move(this.x - this.game.entities[i].x, this.y - this.game.entities[i].y, dt);
				this.state = 'moving';
				return;
			}
		}
		
		//reset nearest target
		
		let dist = 99999;
		let nearestTarget = null;
		let bestF = 99999;
		let bestX = 0;
		let bestY = 0;
		for(let i = 0; i < this.game.entities.length; i++){
			if(this.game.entities[i].team != this.team && !this.game.entities[i].dead){
				let d = this.distBetween(this.game.entities[i]);
				let start = this.game.groundGraph.grid[Math.floor(this.y)][Math.floor(this.x)];
				let end = this.game.groundGraph.grid[Math.floor(this.game.entities[i].y)][Math.floor(this.game.entities[i].x)];
				let res = astar.search(this.game.groundGraph, start, end, { heuristic: astar.heuristics.diagonal });
				
				if(res.length > 0){
					//console.log('res good');
					if(nearestTarget==null){
						//console.log('bestRes null');
						dist = d;
						nearestTarget = this.game.entities[i];
						bestF = res[res.length-1].f;
						bestX = res[0].x;
						bestY = res[0].y;
					}else{
						if(res[res.length-1].f < bestF){
							//console.log('bestRes good, better res');
							dist = d;
							nearestTarget = this.game.entities[i];
							bestF = res[res.length-1].f;
							bestX = res[0].x;
							bestY = res[0].y;
						}else {
							if(res[res.length-1].f == bestF && d < dist){
								//console.log('bestRes good, same res, better dist');
								dist = d;
								nearestTarget = this.game.entities[i];
								bestF = res[res.length-1].f;
								bestX = res[0].x;
								bestY = res[0].y;
							}
						}
					}
				}
			}
		}
		if(dist <= this.range){
			this.focusTarget = nearestTarget;
			this.tryAttack();
			return;
		}
		
		//move toward nearest target
		if(nearestTarget){
			this.move(bestY + 0.5 - this.x, bestX + 0.5 - this.y, dt);
			this.state = 'moving';
			//alert('pause');
			return;
		}
		
		this.state = 'idle';
		
	}
	
	move(x,y,dt){
		let norm = 1 / Math.sqrt(x*x+y*y);
		this.x += x*norm*dt*this.speed;
		this.y += y*norm*dt*this.speed;
		
	}
	
}

export {MeleeGroundUnit};