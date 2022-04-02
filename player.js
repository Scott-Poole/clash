import {Card} from './card.js';
import {MeleeGroundUnit} from './meleeGroundUnit.js';

class Player{
	constructor(game/*deck*/){
		this.game = game;
		this.playable = [new Card(),new Card(),new Card(),new Card()];
		this.rest = [new Card(),new Card(),new Card(),new Card()];
		this.money = 0;
	}
	
	playCard(i,x,y){
		if(this.playable[i]){
			let played = this.playable[i];
			this.playable[i] = this.rest.shift();
			this.rest.push(played);
			//let t = Math.round(Math.random());
			this.game.entities.push(new MeleeGroundUnit(this.game,x+0.5,y+0.5,1));
		}
	}
}

export {Player};
