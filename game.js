import {Player} from './player.js';
import {astar,Graph} from './astar.js';
import {KingTower} from './kingTower.js';
import {PrincessTower} from './princessTower.js';

const gridWidth = 20;
const gridHeight = 40;



class Game {
	constructor(){
		this.player = new Player(this);
		this.entities = [];
		this.hitSchedule = [];
		this.board;
		this.width;
		this.height;
		this.init();
	}
	
	
	update(dt){
		//remove the dead
		for(let i = 0; i < this.entities.length; i++){
			if(this.entities[i].state == 'remove'){
				this.entities.splice(i,1);
				i--;
			}
		}
		
		//update entities
		for(let i = 0; i < this.entities.length; i++){
			this.entities[i].update(dt);
		}
	}
	
	input(inputData){
		if(inputData.type == 'play'){
			this.player.playCard(inputData.i, inputData.x, inputData.y);
		}
	}
	
	init(){
		//set initial entities
		this.board = [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//0
		[0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
		[0,2,2,1,1,1,2,2,2,2,2,2,2,2,1,1,1,2,2,0],//16
		[0,2,2,1,1,1,2,2,2,2,2,2,2,2,1,1,1,2,2,0],//17
		[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];//33
		
		this.width = this.board[0].length;
		this.height = this.board.length;
		
		//towers
		this.entities.push(new KingTower(this, this.width/2, 4, 0));//top
		this.entities.push(new KingTower(this, this.width/2, this.height-4, 1));//bot
		this.entities.push(new PrincessTower(this, 4.5, 7.5, 0));//top left
		this.entities.push(new PrincessTower(this, this.width-4.5, 7.5, 0));//top right
		this.entities.push(new PrincessTower(this, 4.5, this.height-7.5, 1));//bot left
		this.entities.push(new PrincessTower(this, this.width-4.5, this.height-7.5, 1));//bot right
	}
	
	
}

export {Game};