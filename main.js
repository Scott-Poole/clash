import {Game} from './game.js';

let game = new Game();

let canvas = document.getElementById('mainCanvas');
let ctx = canvas.getContext('2d');

const gridWidth = game.width;
const gridHeight = game.height;
const gridDim = 20;//scale

const cardWidth = gridWidth*gridDim/4;
const cardHeight = cardWidth*1.25;

//mouse positions relative to canvas
let mouseX = -1;
let mouseY = -1;

let selectedCard = -1;

//set canvas position and size
let fit = function(){
	canvas.width = gridWidth*gridDim;
	canvas.height = gridHeight*gridDim+cardHeight;
	let left = (window.innerWidth / 2) - (canvas.width / 2) + 'px';
	canvas.style.left = left;
	canvas.style.position = 'absolute';
}

let oldT = 0;
let draw = function(t){
	if(t == oldT)
		return;
	let dt = t - oldT;
	oldT = t;
	
	//update game
	game.update(dt);
	
	//draw game
	//grid
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.strokeStyle = '#229922';
	ctx.beginPath();
	for(let j = 0; j < game.board.length; j++){
		for(let i = 0; i < game.board[0].length; i++){
			//barrier
			if(game.board[j][i] == 1){
				ctx.fillStyle = '#59473e';
				ctx.fillRect(i*gridDim, j*gridDim, gridDim, gridDim);
			}
			//water
			else if(game.board[j][i] == 2){
				ctx.fillStyle = '#3debdf';
				ctx.fillRect(i*gridDim, j*gridDim, gridDim, gridDim);
			}
			//hover
			else if(Math.floor(mouseX/gridDim) == i && Math.floor(mouseY/gridDim) == j){
				ctx.fillStyle = '#92a7d1';
				ctx.fillRect(i*gridDim, j*gridDim, gridDim, gridDim);
			}
			//grid
			else{
				ctx.rect(i*gridDim, j*gridDim, gridDim, gridDim);
			}
			
		}
	}
	ctx.stroke();	
	
	//cards
	for(let i = 0; i < 4; i++){
		//hover
		if(Math.floor(mouseX/cardWidth) == i && 
		mouseY > gridHeight*gridDim && mouseY < gridHeight*gridDim+cardHeight){
			ctx.fillStyle = '#92a7d1';
			ctx.fillRect(i*cardWidth, gridHeight*gridDim, cardWidth, cardHeight);
		}
		//selected
		if(selectedCard == i){
			ctx.fillStyle = game.player.playable[selectedCard].color;
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
		ctx.fillRect(
			game.entities[i].x*gridDim - (game.entities[i].w*gridDim/2), 
			game.entities[i].y*gridDim - (game.entities[i].h*gridDim/2), 
			game.entities[i].w*gridDim, 
			game.entities[i].h*gridDim
		);
	}
	
	window.requestAnimationFrame(draw);
}


window.addEventListener('mousedown',e=>{
	let rect = canvas.getBoundingClientRect();
	let clickX = e.clientX - rect.left;
	let clickY = e.clientY - rect.top;
	
	//set selected card
	if(clickX >= 0 && clickX <= gridWidth*gridDim &&
	clickY >= gridHeight*gridDim && clickY <= gridHeight*gridDim+cardHeight){
		selectedCard = Math.floor(clickX/cardWidth);
	}
	
});

window.addEventListener('mouseup',e=>{
	let rect = canvas.getBoundingClientRect();
	let clickX = e.clientX - rect.left;
	let clickY = e.clientY - rect.top;
	
	//play card
	if(clickX >= 0 && clickX <= gridWidth*gridDim &&
	clickY >= 0 && clickY <= gridHeight*gridDim){
		game.input({
			type:'play',i:selectedCard,
			x:Math.floor(clickX/gridDim),
			y:Math.floor(clickY/gridDim),
		});
		selectedCard = -1;
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