import {Game} from './game.js';

let game = new Game();

let canvas = document.getElementById('mainCanvas');
let ctx = canvas.getContext('2d');

const gridWidth = game.width;
const gridHeight = game.height;
const gridDim = 20;

const cardWidth = gridWidth*gridDim/4;
const cardHeight = cardWidth*1.25;

//mouse positions relative to canvas
let mouseX = -1;
let mouseY = -1;
let clickX = -1;
let clickY = -1;

//set canvas position and size
let fit = function(){
	canvas.width = gridWidth*gridDim;
	canvas.height = gridHeight*gridDim+cardHeight;
	let left = (window.innerWidth / 2) - (canvas.width / 2) + 'px';
	canvas.style.left = left;
	canvas.style.position = 'absolute';
}

let draw = function(time){
	//update game
	game.update();
	
	//draw game
	//grid
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.strokeStyle = '#229922';
	ctx.beginPath();
	for(let i = 0; i < gridWidth; i++){
		for(let j = 0; j < gridHeight; j++){
			//hover
			if(Math.floor(mouseX/gridDim) == i && Math.floor(mouseY/gridDim) == j){
				ctx.fillStyle = '#0000F0';
				ctx.fillRect(i*gridDim, j*gridDim, gridDim, gridDim);
			}
			ctx.rect(i*gridDim, j*gridDim, gridDim, gridDim);
		}
	}
	ctx.stroke();
	//cards
	for(let i = 0; i < 4; i++){
		//hover
		if(Math.floor(mouseX/cardWidth) == i && 
		mouseY > gridHeight*gridDim && mouseY < gridHeight*gridDim+cardHeight){
			ctx.fillStyle = '#0000F0';
			ctx.fillRect(i*cardWidth, gridHeight*gridDim, cardWidth, cardHeight);
		}
		//selected
		if(game.player.selectedCard == i){
			ctx.fillStyle = game.player.playable[game.player.selectedCard].color;
			ctx.fillRect(i*cardWidth, gridHeight*gridDim, cardWidth, cardHeight);
		}
		//non-selected
		else{
			ctx.beginPath();
			ctx.strokeStyle = game.player.playable[i].color;
			ctx.rect(i*cardWidth, gridHeight*gridDim, cardWidth, cardHeight);
			ctx.stroke();
		}
		
	}
	
	//entities
	for(let i = 0; i < game.entities.length; i++){
		ctx.fillStyle = game.entities[i].color;
		ctx.fillRect(game.entities[i].x - (gridDim/2), game.entities[i].y - (gridDim/2), gridDim, gridDim);
	}
	
	window.requestAnimationFrame(draw);
}


window.addEventListener('click',e=>{
	let rect = canvas.getBoundingClientRect();
	clickX = e.clientX - rect.left;
	clickY = e.clientY - rect.top;
	
	//play card
	if(clickX >= 0 && clickX <= gridWidth*gridDim &&
	clickY >= 0 && clickY <= gridHeight*gridDim){
		game.input({type:'play', x:clickX, y:clickY});
	}
	
	//select card
	else if(clickX >= 0 && clickX <= gridWidth*gridDim &&
	clickY >= gridHeight*gridDim && clickY <= gridHeight*gridDim+cardHeight){
		game.input({type:'select', i:Math.floor(clickX/cardWidth)});
	}
	
});

window.addEventListener('load',e=>{
	fit();
});
window.addEventListener('resize',e=>{
	fit();
});

window.addEventListener('mousemove',e=>{
	let rect = canvas.getBoundingClientRect();
	mouseX = e.clientX - rect.left;
	mouseY = e.clientY - rect.top;
});

window.requestAnimationFrame(draw);