class Card{
	constructor(){
		this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
		this.entity = null;
	}
}

export {Card};