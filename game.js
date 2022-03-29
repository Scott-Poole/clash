import {Player} from './player.js';

const gridWidth = 20;
const gridHeight = 40;

const Game = function(){
	this.player = new Player(this);
	this.entities = [];
	this.width = gridWidth;
	this.height = gridHeight;
	this.update = function(){
		for(let i = 0; i < this.entities.length; i++){
			this.entities[i].update();
		}
	};
	this.input = function(input){
		if(input.type == 'select'){
			this.player.selectCard(input.i);
		}else if(input.type == 'play'){
			this.player.playCard(input.x, input.y);
		}
	};
	
}

export {Game};