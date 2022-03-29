const Card = function(){
	this.color= '#'+Math.floor(Math.random()*16777215).toString(16);
}

export {Card};