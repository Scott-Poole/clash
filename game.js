import {Player} from './player.js';
import {Barrier} from './barrier.js';
import {Water} from './water.js';

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
		if(input.type == 'play'){
			this.player.playCard(input.i, input.x, input.y);
		}
	};
	this.init = function(){
		//set initial entities 
		//outer barriers
		this.entities.push(new Barrier(gridWidth/2, 0.5, gridWidth, 1));//top
		this.entities.push(new Barrier(gridWidth/2, gridHeight-0.5, gridWidth, 1));//bottom
		this.entities.push(new Barrier(0.5, gridHeight/2, 1, gridHeight));//left
		this.entities.push(new Barrier(gridWidth-0.5, gridHeight/2, 1, gridHeight));//right
		//inner barriers
		this.entities.push(new Barrier(1+(((gridWidth/2)-3)/2), 1.5, (gridWidth/2)-3, 1));//topleft
		this.entities.push(new Barrier(gridWidth-1-(((gridWidth/2)-3)/2), 1.5, (gridWidth/2)-3, 1));//topright
		this.entities.push(new Barrier(1+(((gridWidth/2)-3)/2), gridHeight-1.5, (gridWidth/2)-3, 1));//bottomleft
		this.entities.push(new Barrier(gridWidth-1-(((gridWidth/2)-3)/2), gridHeight-1.5, (gridWidth/2)-3, 1));//bottomright
		
		this.entities.push(new Barrier(1.5, (gridHeight/2)-1.5, 1, 1));
		this.entities.push(new Barrier(1.5, (gridHeight/2)+1.5, 1, 1));
		this.entities.push(new Barrier(gridWidth-1.5, (gridHeight/2)-1.5, 1, 1));
		this.entities.push(new Barrier(gridWidth-1.5, (gridHeight/2)+1.5, 1, 1));
		
		//water
		this.entities.push(new Water(2, gridHeight/2, 2, 2));//left
		this.entities.push(new Water(gridWidth-2, gridHeight/2, 2, 2));//right
		this.entities.push(new Water(gridWidth/2, gridHeight/2, gridWidth-(6*2), 2));//center
	
	}
	
}

export {Game};