import {Card} from './card.js';
import {Troop} from './troop.js';

const Player = function(game/*deck*/){
	this.game = game;
	this.playable = [new Card(),new Card(),new Card(),new Card()];
	this.rest = [new Card(),new Card(),new Card(),new Card()];
	this.money = 0;
	this.playCard = function(i,x,y){
		if(this.playable[i]){
			let played = this.playable[i];
			this.playable[i] = this.rest.shift();
			this.rest.push(played);
			this.game.entities.push(new Troop(x+0.5,y+0.5,played.color));
		}
	};
}

export {Player};

