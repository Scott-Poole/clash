import {SingleTargetBuilding} from './singleTargetBuilding.js';

class KingTower extends SingleTargetBuilding{
	constructor(game,x,y,team){
		super(game,x,y,team);
		
		//override SingleTargetBuilding
		this.range = 6.5;//unit radius
		this.maxHealth = 200;
		this.damage = 10;//damage per attack
		//this.focusTarget = null;
		//this.looking = 0;
		
		this.spawnDelay = 0; //ms before first action
		this.duringAttackDelay = 200;//ms during attack
		this.betweenAttackDelay = 1500;//ms between strikes
		
		//this.clock = 0;
		//this.actionClock = this.spawnDelay;//ms time before next action
		//this.duringAttackClock = 0;//ms time before attack deals damage
		//this.betweenAttackClock = 0;//ms time when can attack
		
		
		//override Enitity
		this.color = '#e8c764';
		this.r = 2.01;
		//this.dead = false;
		//this.state = 'idle';
		//this.health = this.maxHealth;
		//this.mass=99999;
		
	}
	
}

export {KingTower};